'use strict';

(function () {
  /* ── Tab navigation ── */
  const tabs   = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  function activateTab(targetId) {
    tabs.forEach(function (tab) {
      const isActive = tab.dataset.tab === targetId;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach(function (panel) {
      panel.classList.toggle('active', panel.id === targetId);
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateTab(tab.dataset.tab);
    });

    // Keyboard navigation: arrow keys move between tabs
    tab.addEventListener('keydown', function (e) {
      const tabList = Array.from(tabs);
      const index   = tabList.indexOf(tab);
      if (e.key === 'ArrowRight') {
        tabList[(index + 1) % tabList.length].focus();
      } else if (e.key === 'ArrowLeft') {
        tabList[(index - 1 + tabList.length) % tabList.length].focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        activateTab(tab.dataset.tab);
      }
    });
  });

  /* ── AI Assistant ── */
  var AI_KB = [
    {
      keys: ['pmp', 'project management professional', 'certification'],
      reply: 'The PMP® (Project Management Professional) is PMI\'s flagship certification. To qualify you need 36 months of project leadership experience (60 months without a four-year degree), plus 35 hours of PM education. The exam covers Predictive, Agile, and Hybrid approaches.'
    },
    {
      keys: ['pmbok', 'body of knowledge'],
      reply: 'The PMBOK® Guide is PMI\'s foundational standard. The 7th edition shifted from 10 knowledge areas to 12 Project Management Principles and 8 Performance Domains, placing greater emphasis on value delivery and agile thinking alongside traditional predictive methods.'
    },
    {
      keys: ['agile', 'scrum', 'kanban', 'sprint', 'pmi-acp'],
      reply: 'PMI embraces agile through its Agile Practice Guide (co-developed with the Agile Alliance) and the PMI-ACP® certification. Agile frameworks like Scrum and Kanban focus on iterative delivery, continuous feedback, and empowered cross-functional teams.'
    },
    {
      keys: ['risk', 'risk management', 'rmp', 'pmi-rmp'],
      reply: 'PMI\'s risk management standard covers: Identify Risks → Perform Qualitative Analysis → Perform Quantitative Analysis → Plan Risk Responses → Implement Risk Responses → Monitor Risks. The PMI-RMP® certification validates advanced risk management expertise.'
    },
    {
      keys: ['schedule', 'scheduling', 'pmi-sp', 'critical path', 'gantt'],
      reply: 'Effective scheduling uses techniques like Critical Path Method (CPM), Program Evaluation and Review Technique (PERT), and resource leveling. The PMI-SP® certification focuses on advanced scheduling expertise. Tools like Gantt charts and network diagrams are central to schedule management.'
    },
    {
      keys: ['earned value', 'evm', 'cpi', 'spi', 'budget', 'cost'],
      reply: 'Earned Value Management (EVM) integrates scope, schedule, and cost. Key metrics: CPI (Cost Performance Index) = EV/AC, SPI (Schedule Performance Index) = EV/PV. A CPI > 1 means you\'re under budget; SPI > 1 means ahead of schedule. EAC (Estimate at Completion) forecasts the total project cost.'
    },
    {
      keys: ['stakeholder', 'stakeholders', 'engagement'],
      reply: 'Stakeholder management involves: Identify Stakeholders → Plan Engagement → Manage Engagement → Monitor Engagement. A stakeholder register, power/interest grid, and communication plan are key tools. Continuous engagement throughout the project lifecycle is a core PMI principle.'
    },
    {
      keys: ['capm', 'certified associate'],
      reply: 'The CAPM® (Certified Associate in Project Management) is an entry-level PMI certification. Requirements: secondary diploma (high school/global equivalent) plus 23 hours of PM education. It\'s ideal for those starting their project management career.'
    },
    {
      keys: ['portfolio', 'pfmp', 'pmi portfolio'],
      reply: 'Portfolio management ensures the right programs and projects are selected to deliver strategic objectives. The PfMP® (Portfolio Management Professional) certification is for senior professionals responsible for aligning portfolios with organizational strategy.'
    },
    {
      keys: ['program', 'pgmp', 'program management'],
      reply: 'Program management is the coordinated management of related projects to achieve benefits unavailable from managing them individually. The PgMP® (Program Management Professional) is PMI\'s senior-level certification for program managers.'
    },
    {
      keys: ['principle', 'principles', 'pmbok 7', 'pmbok7'],
      reply: 'PMBOK® 7th Edition defines 12 Project Management Principles: Stewardship, Team, Stakeholders, Value, Systems Thinking, Leadership, Tailoring, Quality, Complexity, Risk, Adaptability & Resilience, and Change. These principles guide decision-making across any delivery approach.'
    },
    {
      keys: ['ethics', 'code of ethics', 'conduct'],
      reply: 'PMI\'s Code of Ethics & Professional Conduct upholds four values: Responsibility, Respect, Fairness, and Honesty. All PMI certification holders must adhere to this code. Ethical behavior is fundamental to maintaining trust and delivering project success.'
    },
    {
      keys: ['quality', 'quality management', 'control quality'],
      reply: 'Quality management in projects involves: Plan Quality Management → Manage Quality → Control Quality. Key tools include control charts, cause-and-effect diagrams, checklists, and statistical sampling. Quality should be built in from the start, not inspected in at the end.'
    },
    {
      keys: ['communication', 'communicate', 'communication plan'],
      reply: 'Effective communication is critical — PMI research shows that ineffective communication is a top cause of project failure. A communication management plan defines who needs what information, when, and how. Project managers spend roughly 90% of their time communicating.'
    },
    {
      keys: ['hybrid', 'hybrid approach', 'predictive', 'waterfall'],
      reply: 'Hybrid approaches blend predictive (waterfall) and agile methods. For example, you might use a waterfall schedule for hardware delivery while running software development in sprints. PMI\'s PMBOK® 7th Edition actively supports hybrid delivery tailored to project context.'
    },
    {
      keys: ['scope', 'scope management', 'wbs', 'work breakdown'],
      reply: 'Scope management ensures you deliver exactly what was agreed upon — no more, no less. Key outputs: Scope Statement, Work Breakdown Structure (WBS), and WBS Dictionary. Change control processes protect scope from unmanaged "scope creep."'
    },
    {
      keys: ['hello', 'hi', 'hey', 'greet'],
      reply: 'Hello! I\'m your PMI AI Assistant. Ask me about PMBOK, certifications (PMP, CAPM, PMI-ACP), risk management, agile practices, or any other project management topic!'
    },
    {
      keys: ['thank', 'thanks', 'thank you'],
      reply: 'You\'re welcome! If you have more project management questions, I\'m here to help. Good luck with your projects and certifications!'
    }
  ];

  function aiRespond(userText) {
    var lower = userText.toLowerCase();
    for (var i = 0; i < AI_KB.length; i++) {
      var entry = AI_KB[i];
      for (var j = 0; j < entry.keys.length; j++) {
        if (lower.indexOf(entry.keys[j]) !== -1) {
          return entry.reply;
        }
      }
    }
    return 'That\'s a great project management question! For detailed guidance, I recommend consulting the PMBOK® Guide, PMI\'s Practice Standards, or visiting pmi.org. You can also ask me about specific topics like risk management, scheduling, certifications, stakeholder engagement, or PMBOK principles.';
  }

  function appendMessage(text, role) {
    var container = document.getElementById('ai-messages');
    if (!container) { return; }

    var msg = document.createElement('div');
    msg.className = 'ai-message ai-message--' + role;

    var avatar = document.createElement('span');
    avatar.className = 'ai-message__avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = role === 'bot' ? '🤖' : '🧑';

    var bubble = document.createElement('div');
    bubble.className = 'ai-message__bubble';
    bubble.textContent = text;

    msg.appendChild(avatar);
    msg.appendChild(bubble);
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
  }

  var form = document.getElementById('ai-input-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('ai-input');
      var userText = input.value.trim();
      if (!userText) { return; }

      appendMessage(userText, 'user');
      input.value = '';

      // Simulate brief thinking delay for natural feel
      setTimeout(function () {
        appendMessage(aiRespond(userText), 'bot');
      }, 350);
    });
  }
}());
