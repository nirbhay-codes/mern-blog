## #1 Issue
> Sometimes the DNS server does not work as intended and we are unable to connect to the Mongo DB on the wifi router although we can connect to the mongo DB using hotspot or other network without issues. 

### Error: 

```
Error: querySrv ETIMEOUT _mongodb._tcp.mern-blog.wc7mhrf.mongodb.net
    at QueryReqWrap.onresolve [as oncomplete] (node:internal/dns/promises:251:17) {
  errno: undefined,
  code: 'ETIMEOUT',
  syscall: 'querySrv',
  hostname: '_mongodb._tcp.mern-blog.wc7mhrf.mongodb.net'
}
```

### Solution

Firstly, we need to confirm that the DNS server is working or not. If it is not working it will display something like below:
```
lnirb@nirbhay MINGW64 ~
$ nslookup -query=srv _mongodb._tcp.mern-blog.wc7mhrf.mongodb.net
*** Request to dlinkrouter timed-out
Server:  dlinkrouter
Address:  192.168.0.1

DNS request timed out.
    timeout was 2 seconds.
DNS request timed out.
    timeout was 2 seconds.
```

Then we need to change the IPv4 DNS settings from the control panel.

- Open the Start menu and search for Control Panel.
- Click on View network status and tasks.
- Click on the name of your Wi-Fi connection.
- Click on Properties.
- Locate Internet Protocol Version 4 (TCP/IPv4) and double-click it.
- Select the option Use the following DNS server addresses:.
- Enter the desired Preferred DNS server and Alternate DNS server addresses. Here are some popular reliable DNS servers:
    - Google Public DNS:
      - Preferred: 8.8.8.8
      - Alternate: 8.8.4.4
    - OpenDNS:
      - Preferred: 208.67.222.222
      - Alternate: 208.67.220.220
- Click OK on all open windows to save the changes.
- Retry connecting to the MongoDB server from code/compass.
----

## #2 Issue 

> - If we want to update the `collection` in MongoDB when we send any requests to the backend API then we need to pass the collection name in the MongoDB connection string. 
> - But the default string provided by MongoDB does not work if we append the `collection` name. 
> - So we can use the below string with the collection name "mern-blog" appended as shown.

MONGO = "mongodb+srv://nirbhay:nirbhay@mern-blog.wc7mhrf.mongodb.net/mern-blog"