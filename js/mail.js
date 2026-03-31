// mail.js - Zoho Mail UI Logic

const emailData = {
  inbox: [
      { id: 1, sender: 'noreply@mail.zoho.ae', subject: 'UAE1 - VirtualOffice - Domain Stats Summary', preview: 'Your domain stats summary...', time: '4:01 PM', size: '4 KB', unread: true, body: 'Dear User,\n\nYour VirtualOffice domain stats summary is ready.\n\nBest regards,\nZoho Team' },
          { id: 2, sender: 'noreplyregression@mail360.localzoho.com', subject: 'Queue Audits', preview: 'Queue audit report...', time: '3:59 PM', size: '3 KB', unread: true, body: 'Queue audit report is attached.\n\nThis is an automated notification.' },
              { id: 3, sender: 'zl-noreply@logs.zohologs.in', subject: 'Request from sagar.sn@zodoor.in to access ZMNICProtocols', preview: 'Access request received...', time: '3:54 PM', size: '15 KB', unread: true, body: 'Access request from sagar.sn@zodoor.in for ZMNICProtocols logs.' },
                  { id: 4, sender: 'build-notifications@zohocorp.com', subject: 'Build Move Notification', preview: 'Latest build moved...', time: '3:52 PM', size: '4 KB', unread: true, body: 'Build moved to production.\nBuild ID: #20260331-001\nStatus: Success' },
                      { id: 5, sender: 'zac-noreply@zoho.com', subject: 'US4 - Certificate Issuance Status', preview: 'Certificate issued...', time: '3:41 PM', size: '1 KB', unread: true, body: 'Certificate issuance for customer-mail.zoho.com_214.\nStatus: Issued Successfully' },
                          { id: 6, sender: 'noreplyregression@mail360.localzoho.com', subject: 'Queue Audits', preview: 'Another queue audit...', time: '3:39 PM', size: '2 KB', unread: false, body: 'Queue audit completed. No issues found.' },
                              { id: 7, sender: 'zl-noreply@logs.zohologs.in', subject: 'Throttling Notifier for zoho-ZohoMailFREE', preview: 'Throttling alert...', time: '3:25 PM', size: '4 KB', unread: true, body: 'Throttling applied to zoho-ZohoMailFREE due to high volume.' },
                                  { id: 8, sender: 'build-notifications@zohocorp.com', subject: 'Build Revert Notification', preview: 'Build reverted...', time: '3:10 PM', size: '3 KB', unread: false, body: 'Build #20260330-045 has been reverted.\nReason: Critical bug in production.' }
                                    ],
                                      drafts: [{ id: 9, sender: 'Draft', subject: 'Re: Project Update', preview: 'Following up...', time: 'Yesterday', size: '1 KB', unread: false, body: 'Following up on our last meeting...' }],
                                        sent: [], spam: [], trash: []
                                        };

                                        let currentFolder = 'inbox';
                                        let currentEmail = null;

                                        document.addEventListener('DOMContentLoaded', () => { renderEmailList(currentFolder); setupEvents(); });

                                        function setupEvents() {
                                          document.getElementById('composeBtn')?.addEventListener('click', openCompose);
                                            document.querySelectorAll('.folder-item').forEach(item => {
                                                item.addEventListener('click', () => selectFolder(item.dataset.folder));
                                                  });
                                                  }

                                                  function selectFolder(folder) {
                                                    currentFolder = folder;
                                                      document.querySelectorAll('.folder-item').forEach(i => i.classList.toggle('active', i.dataset.folder === folder));
                                                        document.querySelector('.folder-title-text').textContent = folder.charAt(0).toUpperCase() + folder.slice(1);
                                                          renderEmailList(folder);
                                                            clearEmailView();
                                                            }

                                                            function renderEmailList(folder) {
                                                              const list = document.getElementById('emailList');
                                                                if (!list) return;
                                                                  const emails = emailData[folder] || [];
                                                                    if (!emails.length) { list.innerHTML = '<div style="padding:40px;text-align:center;color:#aaa">No emails in ' + folder + '</div>'; return; }
                                                                      list.innerHTML = emails.map(e => {
                                                                          const init = e.sender.substring(0,2).toUpperCase();
                                                                              const col = strColor(e.sender);
                                                                                  return '<div class="email-item ' + (e.unread?'unread':'') + '" data-id="' + e.id + '" onclick="openEmail(' + e.id + ')">' +
                                                                                        '<div class="email-avatar" style="background:' + col + '">' + init + '</div>' +
                                                                                              '<div class="email-content"><div class="email-sender">' + esc(e.sender) + '</div><div class="email-subject">' + esc(e.subject) + '</div>' +
                                                                                                    '<div style="font-size:12px;color:#999;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(e.preview) + '</div></div>' +
                                                                                                          '<div class="email-meta"><div><div class="email-time">' + e.time + '</div><div class="email-size">' + e.size + '</div></div>' +
                                                                                                                (e.unread?'<div class="unread-dot"></div>':'') + '</div></div>';
                                                                                                                  }).join('');
                                                                                                                  }
                                                                                                                  
                                                                                                                  function openEmail(id) {
                                                                                                                    const email = Object.values(emailData).flat().find(e => e.id === id);
                                                                                                                      if (!email) return;
                                                                                                                        currentEmail = email; email.unread = false;
                                                                                                                          document.querySelector('[data-id="' + id + '"]')?.classList.remove('unread');
                                                                                                                            const panel = document.getElementById('emailReadingPanel');
                                                                                                                              if (!panel) return;
                                                                                                                                const init = email.sender.substring(0,2).toUpperCase(), col = strColor(email.sender);
                                                                                                                                  panel.innerHTML = '<div class="email-view"><div class="email-view-header">' +
                                                                                                                                      '<div class="email-view-subject">' + esc(email.subject) + '</div>' +
                                                                                                                                          '<div class="email-view-meta"><div class="email-view-avatar" style="background:' + col + '">' + init + '</div>' +
                                                                                                                                              '<div class="email-view-info"><div class="email-view-sender">' + esc(email.sender) + '</div><div class="email-view-time">' + email.time + '</div></div>' +
                                                                                                                                                  '<div style="display:flex;gap:8px"><button onclick="replyEmail()" style="background:#f5f5f5;border:1px solid #ddd;border-radius:4px;padding:6px 14px;cursor:pointer">Reply</button>' +
                                                                                                                                                      '<button onclick="deleteEmail(' + id + ')" style="background:#fff;border:1px solid #ddd;border-radius:4px;padding:6px 10px;cursor:pointer;color:#e04040">Delete</button></div></div></div>' +
                                                                                                                                                          '<div class="email-view-body">' + esc(email.body) + '</div></div>';
                                                                                                                                                          }
                                                                                                                                                          
                                                                                                                                                          function clearEmailView() {
                                                                                                                                                            const p = document.getElementById('emailReadingPanel');
                                                                                                                                                              if (p) p.innerHTML = '<div class="reading-placeholder"><p>Select an email to read</p></div>';
                                                                                                                                                              }
                                                                                                                                                              
                                                                                                                                                              function deleteEmail(id) {
                                                                                                                                                                for (const k of Object.keys(emailData)) {
                                                                                                                                                                    const i = emailData[k].findIndex(e => e.id === id);
                                                                                                                                                                        if (i !== -1) { emailData[k].splice(i, 1); break; }
                                                                                                                                                                          }
                                                                                                                                                                            renderEmailList(currentFolder); clearEmailView();
                                                                                                                                                                            }
                                                                                                                                                                            
                                                                                                                                                                            function replyEmail() {
                                                                                                                                                                              if (!currentEmail) return;
                                                                                                                                                                                openCompose();
                                                                                                                                                                                  setTimeout(() => {
                                                                                                                                                                                      document.getElementById('composeTo').value = currentEmail.sender;
                                                                                                                                                                                          document.getElementById('composeSubject').value = 'Re: ' + currentEmail.subject;
                                                                                                                                                                                            }, 100);
                                                                                                                                                                                            }
                                                                                                                                                                                            
                                                                                                                                                                                            function openCompose() { document.getElementById('composeModal').style.display = 'flex'; }
                                                                                                                                                                                            function closeCompose() {
                                                                                                                                                                                              document.getElementById('composeModal').style.display = 'none';
                                                                                                                                                                                                document.getElementById('composeTo').value = '';
                                                                                                                                                                                                  document.getElementById('composeSubject').value = '';
                                                                                                                                                                                                    document.getElementById('composeBody').innerText = '';
                                                                                                                                                                                                    }
                                                                                                                                                                                                    function minimizeCompose() { document.getElementById('composeModal').style.display = 'none'; }
                                                                                                                                                                                                    function sendEmail() {
                                                                                                                                                                                                      const to = document.getElementById('composeTo').value;
                                                                                                                                                                                                        const sub = document.getElementById('composeSubject').value;
                                                                                                                                                                                                          if (!to || !sub) { alert('Please fill To and Subject.'); return; }
                                                                                                                                                                                                            alert('Email sent to ' + to);
                                                                                                                                                                                                              closeCompose();
                                                                                                                                                                                                              }
                                                                                                                                                                                                              
                                                                                                                                                                                                              function esc(t) { const d = document.createElement('div'); d.appendChild(document.createTextNode(t)); return d.innerHTML; }
                                                                                                                                                                                                              function strColor(s) {
                                                                                                                                                                                                                const c = ['#1a73e8','#e04040','#50c878','#f0a030','#8040c0','#00aacc','#cc4400'];
                                                                                                                                                                                                                  let h = 0; for (let i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h);
                                                                                                                                                                                                                    return c[Math.abs(h) % c.length];
                                                                                                                                                                                                                    }
