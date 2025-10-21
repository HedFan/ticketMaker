# Ticket Maker

### What it can?

	1.	Recolour Ticket Creation - Creting a ticket with photo ID, style, priority, and partner.
              Only an operator can create a new ticket. You can change your role using the select box in the top-right corner.
	2.	Ticket Queue - List all tickets with status (Pending, Sent, In Progress, Completed, Rejected) and filters.
              You can filter tickets by status; the list updates immediately.
              Selecting all filters resets them. 
               A colored circle indicates ticket status:
                    "Pending": white,
                    "In Progress": gray,
                    "Rejected": red,
                    "Completed": green,
                    "Sent": blue
	3.	Partner Integration - Simulating sending tickets to partners and show receipt status.
              Clicking the Send button changes the ticket status to "Sent".
              After 5 seconds, it changes to "In Progress".
              After another 5 seconds, it changes to "Completed".
	4.	Approval & Storage - Approving to store in “Approved Library,” reject to return to queue.
              Only a Manager can see the "Approuve" button. You can change your role using the select box in the top-right corner.
              Clicking Approve moves the ticket to "Approved Library" and sets status to "Completed". The button then toggles to "Disapprove". Clicking "Disapprove" moves it back to "Ticket Queue" and sets status to "Pending".
	5.	Navigation - Main menu and sidebar (Queue, Approved Library, Partner Overview).
              Sidebar on the right side (Ticket Queue, Approved Library, Partner Overview);
              Top bar has the logo and role switcher.

### Nice to have (but not implementing):
- Add a small dashboard with KPIs (e.g., “10 tickets pending”, “3 awaiting approval”).
- Confirmation dialog about ticket deleting;
- Upload photos or/and show a list of uploaded photos in tickets;
- Optimized data updates: Right now it updates after each change, almost like in Jira. Ideally, it should update on focus loss and via a "Save" button when creating a new ticket.

### Some notes:
- "Partner Overview" is currently empty. The idea: a dashboard showing ticket counts and statuses per partner.
- The main tools: 
      Express for backend; 
      Vue3 for frontend; 
      Pinia for state management;
      Tailwinds for css;
      Prettier with default preset for code formatting;
- Pure time: it took about 10-12 hours;



_________________________________________________________


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
