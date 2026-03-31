# zoho-mail-calendar

A front-end clone/reference implementation of **Zoho Mail** and **Zoho Calendar** UI using pure HTML, CSS, and vanilla JavaScript.

## Features

### Mail (index.html)
- Three-panel layout: Folder sidebar, Email list, Email reading pane
- - Folder navigation: Inbox, Drafts, Templates, Snoozed, Sent, Spam, Trash, Archive, Outbox
  - - Tags panel (Marketing, Jambav, Client)
    - - Email list with sender avatars, subject, preview, time, size, and unread indicator
      - - Click to open and read emails
        - - Reply and Delete email actions
          - - Compose new email modal (To, Subject, Body fields)
            - - Send, Minimize, Close compose actions
             
              - ### Calendar (calendar.html)
              - - Sidebar with My Calendars and Shared Calendars lists
                - - Mini month calendar with navigation
                  - - Week view with day headers and time grid (24-hour)
                    - - All-day events row (holidays, special days)
                      - - Timed events displayed as colored blocks
                        - - Navigate between weeks with Prev/Next arrows
                          - - "Today" button to jump to current date
                            - - New Event modal with title, datetime, calendar selector, description fields
                              - - Click on time slot to create event at that time
                                - - Timezone label (Asia/Kolkata)
                                 
                                  - ## Project Structure
                                 
                                  - ```
                                    zoho-mail-calendar/
                                    ├── index.html          # Mail UI
                                    ├── calendar.html       # Calendar UI
                                    ├── css/
                                    │   ├── shared.css      # Shared styles (sidebar, layout, utilities)
                                    │   ├── mail.css        # Mail-specific styles
                                    │   └── calendar.css    # Calendar-specific styles
                                    └── js/
                                        ├── mail.js         # Mail logic (email data, rendering, compose)
                                        └── calendar.js     # Calendar logic (week view, events, mini calendar)
                                    ```

                                    ## Getting Started

                                    1. Clone the repository:
                                    2.    ```
                                             git clone https://github.com/raghavan-pk-14163/zoho-mail-calendar.git
                                             ```
                                          2. Open `index.html` in your browser for the Mail view
                                          3. 3. Open `calendar.html` for the Calendar view
                                             4. 4. No build tools or dependencies required — pure HTML/CSS/JS
                                               
                                                5. ## Tech Stack
                                                6. - HTML5
                                                   - - CSS3 (Flexbox, Grid, CSS Custom Properties)
                                                     - - Vanilla JavaScript (ES6+)
                                                      
                                                       - ## Screenshots
                                                       - - Mail view: 3-panel layout with folder tree, email list, reading pane
                                                         - - Calendar view: Week view with events, mini calendar sidebar, new event modal
                                                           - 
                                                           ## License
                                                           MIT
