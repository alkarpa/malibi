# M'alibi Time Tracker

M'alibi is a time tracker app made using React and Redux.

I originally set out to make a simple time tracker for myself primarily for keeping track of the time consumption of my projects.
The original plan turned out to be too simple to be useful so I'm working on making it a bit more robust.

The name M'alibi came to me when I happened to read the phrase "m'lady" while wondering what to call my time tracker.

## Configuration

Currently the software stores all the time tracking data in the user's browser localStorage.
No further configuration required.

The tracking data is stored in the user's browser localStorage and is therefore dependent on M'alibi's origin and user's browser and machine.

Tracking data can be transferred from browser to another by copying the contents of M'alibi's localStorage. This must be done manually by the user.

The choice of localStorage as the storage medium limits the storable data to 5MB. This limit is unlikely to be met with normal tracking.

## Using the time tracker

The basic unit of time tracking in M'alibi is called an _Alibi_. An Alibi consists of an interval of time and an associated project, eg.
interval from 9:30 to 10:20 on the first of May and project 'Write a README.md'.

You create Alibis by pressing the Start button and end them by pressing the Stop button. Projects can be assigned by clicking the Alibi's project field
or by dragging and dropping the projects from the projects drag and drop menu (only available on larger screens and only functional on inputs other than touch screens).

Projects can be created and managed in the Projects tab.

## Bits and pieces explained

### Header / Time tracker

| Input element | Explanation |
|---------------|------------|
|Start| Creates a new Alibi |
|Stop| Finishes the active Alibi |
|Breakpoint| Ends the active Alibi and immediately starts a new one |
|Project| Set the project of the (last) active Alibi |

| View element | Explanation |
|--------------|-------------|
| Start | The time when the (last) active Alibi was created |
| End | The time when the last active Alibi was finished |
| 🕑 | The length of the (last) active Alibi in hours:minutes:seconds |
| Σ🕑 | The sum length of all Alibis that have been active today in hours:minutes:seconds |

### Alibi listings

| Input element | Explanation |
|---------------|-------------|
| ✎ | Opens a form to modify the listed Alibi |
| Project | Set the project of the listed Alibi |
| ✋ | Opens a drag and drop list of projects |

| View element | Explanation |
|--------------|-------------|
| Start | The time when the listed Alibi was created |
| End | The time when the listed Alibi was finished |
| Difference | The length of the listed Alibi in hours:minutes:seconds |
| Total | The sum length of all the Alibis listed in this list in hours:minutes:seconds |