document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const sections = document.querySelectorAll(".section");

  //從 sessionStorage 讀取上次的位置
  const lastSectionId = sessionStorage.getItem('lastSection');
  if (lastSectionId) {
    const target = document.getElementById(lastSectionId);
    if (target) {
      sections.forEach(sec => sec.classList.remove('active'));
      const parent = target.closest('.section');
      if (parent) {
        parent.classList.add('active');
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
    sessionStorage.removeItem('lastSection'); // 清除以免重複
  } else {
    // 預設只顯示第一個 section
    sections.forEach(section => section.classList.remove("active"));
    if (sections[0]) sections[0].classList.add("active");
  }

  // 控制頁內區塊切換
  navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const href = this.getAttribute("href");
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      const parentSection = targetElement.closest('.section');
      if (!parentSection) return;

      sections.forEach(section => section.classList.remove("active"));
      parentSection.classList.add("active");

      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }, 50);
    });
  });

  //記住使用者當前區塊
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
      const activeSection = document.querySelector('.section.active');
      if (activeSection && activeSection.id) {
        sessionStorage.setItem('lastSection', activeSection.id);
      }
    });
  });

  // Tabs 功能：支援 project-tabs 中的按鈕切換內容
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      const container = button.closest('.project-tabs');
      if (!container) return;

      // 切換按鈕 active
      container.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 切換內容面板
      container.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
      const targetPanel = container.querySelector(`#${tabId}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
});