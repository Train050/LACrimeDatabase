Intro:
    This program is a web-based application meant for the purposes of studying Crime Data in the Los Angeles area.
    In order to run the program please run the "main.js" file and follow the link in the console. Note that the current
    IP address is set to the localhost, if you wish to broadcast your LAN then switch out the 'ip' variable with your
    IPv4 address.

Requirements:
    *In order to run this program, some form of Oracle Local Libraries must be on the system.
    The easiest way to do this is by installing Oracle Instant Client and adding to the Enviroment Variable PATH

    *This program requires internet access to be able to use the Chart.js functionality (TODO: Make this local somehow?)

    *You must be on the UFL Wi-Fi Network, or be using the Cisco AnyConnect VPN since this uses UFL Oracle Database.

    *Finally, a username and password will need to be entered into the RunDatabase.js file replacing the 6 *s
    considering this is now on Github, please be careful to not leak your passwords (TODO: Finish functionality to grab
    from a local file instead since it already parses the JS object from a string)

Libraries used:
    *Chart.js
    *Node.js
    *Express.js
    *Oracledb.js

Dev Notes:
    *Running queries has been implemented, in order to run a query add "/database/${INSERT QUERY DATA HERE}" with '_'
    instead of spaces.
    (Ex. http://127.0.0.1:3000/database/SELECT_*_FROM_CRIMEDATA)
    We should (keyword there is should) be able to use the fetch API to access the data that it replies within app.js
    (the 'client' side JS file), but I have yet to test it.

    *Currently the site is just serving the entire FrontEnd folder to make images, fonts and CSS accessible to the client
    , which isn't the most secure I think but I'm still new to everything to do with Web Apps and it seems to work.

    *Currently I've added a chart to Arrests By Race, but it isnt the correct chart, was mostly to test and see if I
    could get Chart.js working on the client side (Yes it does work, but the area where the image used to be is a bit
    small)


