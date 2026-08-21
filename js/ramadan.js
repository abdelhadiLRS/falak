/* js/ramadan.js - Ramadan Challenge & Daily Program Logic */

document.addEventListener('DOMContentLoaded', function () {
  const tasksContainer = document.getElementById('ramadan-tasks-container');
  const progressEl = document.getElementById('ramadan-progress-percent');
  const progressBarEl = document.getElementById('ramadan-progress-bar');

  const ramadanTasks = [
    { id: "fasting", text: "صيام اليوم واحتساب الأجر" },
    { id: "quran_juz", text: "قراءة جزء كامل من القرآن الكريم" },
    { id: "taraweeh", text: "أداء صلاة التراويح / القيام" },
    { id: "adhkar_m_e", text: "المحافظة على أذكار الصباح والمساء" },
    { id: "sadaqah", text: "تقديم صدقة اليوم ولو بسيطة" },
    { id: "duaa_iftar", text: "الدعاء عند الإفطار واستحضار النية" }
  ];

  let completedTasks = JSON.parse(localStorage.getItem('falak_ramadan_progress') || '[]');

  function renderTasks() {
    if (!tasksContainer) return;

    tasksContainer.innerHTML = ramadanTasks.map(t => {
      const isChecked = completedTasks.includes(t.id);
      return `
        <div class="card" style="display:flex; align-items:center; gap:1rem; padding:1rem; cursor:pointer;" onclick="toggleTask('${t.id}')">
          <input type="checkbox" ${isChecked ? 'checked' : ''} style="width:22px; height:22px; accent-color:var(--accent-color); pointer-events:none;" />
          <span style="font-size:1.1rem; font-weight:600; ${isChecked ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${t.text}</span>
        </div>
      `;
    }).join('');

    updateProgress();
  }

  function updateProgress() {
    const percent = Math.round((completedTasks.length / ramadanTasks.length) * 100);
    if (progressEl) progressEl.textContent = `${percent}%`;
    if (progressBarEl) progressBarEl.style.width = `${percent}%`;
  }

  window.toggleTask = function (taskId) {
    const idx = completedTasks.indexOf(taskId);
    if (idx >= 0) {
      completedTasks.splice(idx, 1);
    } else {
      completedTasks.push(taskId);
      window.FalakMain.showToast('تقبل الله طاعتكم ✨');
    }
    localStorage.setItem('falak_ramadan_progress', JSON.stringify(completedTasks));
    renderTasks();
  };

  renderTasks();
});
