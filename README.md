# Javascript
## Javascript Advance Concepts
- Nested function's scope
- Closures
- Currying
- **this** keyword
- Prototype
- Prototypal inheritence
- Class
- Iterables & Iterators
- Generators

### Scope
- **Block scope**
    - varibales declared **inside a pair of curly braces** can't be accessed from outside the block.
- **Function scope**
    - varibales declared **inside a function** can't be accessed from outside the block.
- **Global scope**
    - Globally scoped varibales can be accessed inside a block or function.
- **Nested function's scope**
    - Functions can use variables declared 
        - in the same function and 
        - outside of the function scope.
    ```
    const a = 10;
    const outerFxn = () => {
        const b = 20;
        const innerFxn = () => {
            const c = 30;
            console.log(a, b, c)
        }
        innerFxn();
    }
    outerFxn();
    ```
    - So here innerFxn can access all 3 variables but outerfunction can access only a,b.

### Closures
- A closure is the combination of the function **bundled** with **reference** to its surrounding state.
- Closures are created every time a function is created, at function creation time.
- **Normal Way**: Output: 1 1 1
    ```
    const outerFxn = () => {
        let counter = 0;
        const innerFxn = () => {
            counter++;
            console.log(counter)
        }
        innerFxn();
    }
    outerFxn();
    outerFxn();
    outerFxn();
    ```
- **Closure Way** Output: 1 2 3
    ```
    const outerFxn = () => {
        let counter = 0;
        return () => {
            counter++;
            console.log(counter)
        }
    }
    const fn = outerFxn();
    fn();
    fn();
    fn();
    ```
- Closure understanding:
    - In javascript, when we return a function from another function, we are effectively returning a combination of the function defining along with the function's scope.
    - This would let the function definition have an associated persisted memory which could hold on to live data between executions. 
    - That combination of the function and its scope chain is what is called a **closure** in javascript.
- **Closure call in normal way** Output: 1 1 1
    ```
    const closureCallAsNormal = ()=>{
        const outerFxn = () => {
            let counter = 0;
            return () => {
                counter++;
                console.log(counter)
            }
        }
        outerFxn()();  
        outerFxn()();  
    }
    ```
- With closures, functions, which are returning from main functions, have access to the variables declared in the main function scope even after main function's execution.

### Function currying:


# NodeJS
src: The Coding Classroom.
- ## Introduction:
    - Node.js is a javascript runtime built on Google's open source V8 javascript engine.
    - It can be used to build fast, highly scalable network applications (back-end).
- ## Pros:
    - Single-threaded, based on event driven, non-blocking I/O model which makes NodeJS lightweight and efficient.
    - Perfect for building **fast** and **scalable** data-intensive apps which makes it 
        - fit for building apps like:
            - API with database behind it (preferbly NoSQL).
            - Data streaming (think Youtube)
            - Real-time chat application.
            - Server side web application.
        - not fit for apps:
            - with heavy server-side processing (CPU-intensive) like having image manipulation, video conversion, file compression or anything like that. (PHP and Python, Ruby on rails are good for these). 
    - Companies like **Netflix**, **Paypal**, **UBER**, have started using node in production.
    - Javascript can be used across the entire stack: faster and more efficient development.
    - **NPM**: huge library of open-source packages available for everyone for free.
    - Very active developer community.
    -  REPL:
       - Read: to read 
       - Eval: Evaluate
       - Print: print to console
       - Loop: return and read
- ## Blocking and Non-blocking (Synchronous and Asynchronous) :
  - JavaScript is single-threaded, but parallelism and multithreading are possible within Node.js with the help of worker threads. 
  - We can make an Express.js server faster with worker threads when the main thread is blocked by heavy computations.
  - In server.js blocking api is taking lot more time and it is also blocking non-blocking api to get executed.
  - NodeJS works on V8 engine which implements **libuv** library.
- ## libuv 
    - is used to abstract non-blocking I/O operations to a consistent interface across all supported platforms.
    - provides mechanism to handle:
        - file system
        - DNS,
        - network
        - child processes
        - pipes
        - signal handling
        - polling and 
        - streaming.
    - It also includes a thread pool for offloading work for some things that can't be done asynchronously at the OS level.
    - libuv lets the node application to spawn some extra hidden threads. (There 7 threads including main thread).
        - 2 threads are for garbage collection.
        - 4 are there to respond when needed (like I/O like DB, File handling and Network data transmissions)
  - Before code: **server.js**
      ```
      const express = require('express');
      const morgan = require('morgan')
      const app = express();
      const PORT = 5000;
      app.use(morgan("dev"))

      app.get("/non-blocking", async (req, res) => {
          res.send({
              message: "Message from non-blocking",
              count: 0
          });
      });

      app.get("/blocking", async (req, res) => {
          let sum = 0;
          for (let i = 0; i < 20000000000000000000; i++) {
              sum += i;
          }
          res.send({
              message: "Message from blocking",
              count: sum
          });
      });

      app.listen(PORT, () => {
          console.log(`App is up and running on ${PORT}`);
      });
      ```
  - Now spans are added: Code changed is: **sever.js**
      ```
      const express = require('express');
      //=========workers are added=============//
      const { Worker } = require('worker_threads'); // Correct 
      //=========workers are added=============//
      const morgan = require('morgan')
      const app = express();
      const PORT = 5000;
      app.use(morgan("dev"))

      app.get("/non-blocking", async (req, res) => {
          res.send({
              message: "Message from non-blocking",
              count: 0
          });
      });

      app.get("/blocking", async (req, res) => {

          //=========workers are added=============//
          const worker = new Worker("./worker.js");
          worker.on("message", (data) => {
              res.send({
                  message: "Message from blocking",
                  count: data
              });
          });
          worker.on("error", (data) => {
              res.send({
                  message: "Message from blocking",
                  count: 0
              });
          });
          //=========workers are added=============//
      });

      app.listen(PORT, () => {
          console.log(`App is up and running on ${PORT}`);
      });
      ```
      **worker.js**
      ```
      const { parentPort } = require('worker_threads');
      let sum = 0;
      for (let i = 0; i < 20000000000000000000; i++) {
          sum += i;
      }

      // Send the result back to the main thread
      parentPort.postMessage(sum);
      ```
  - using threads, tidious processes can be done very fastily. And the code is as follows:
      **thread-workers.js**
      ```
      const { workerData, parentPort } = require('worker_threads');
      let sum = 0;
      for (let i = 0; i < 20000000000/workerData.thread_count; i++) {
          sum += i;
      }

      // Send the result back to the main thread
      parentPort.postMessage(sum);
      ```
      **thread-workers-server.js**
      ```
      const THREAD_COUNT = 4;
      function createWorker() {
          return new Promise((resolve, reject) => {
              const worker = new Worker("./four-workers", {
                  workerData: {
                      thread_count: THREAD_COUNT
                  }
              });
              worker.on("message", (data) => {
                  resolve(data)
              });
              worker.on("error", (error) => {
                  reject({
                      message: "Message from blocking",
                      count: 0,
                      error: error
                  });
              });
          })
      }

      app.get("/blocking", async (req, res) => {
          try {
              const workerPromises = [];
              for (let i = 0; i < THREAD_COUNT; i++) {
                  workerPromises.push(createWorker())
              }
              const threadResult = await Promise.all(workerPromises);
              // const data = threadResult[0] + threadResult[1] + threadResult[2] + threadResult[3]
              const data = threadResult.reduce((acc, val) => acc + val, 0)
              res.send({
                  message: "Message from blocking",
                  count: data
              });
          } catch (error) {
              console.log(error)
              res.send(error);
          }
      });
      ```
      Here in workers page, we are dividing that task into 4 parts and 4 parts will be summed up in the last by: 
      ```
      const data = threadResult.reduce((acc, val) => acc + val, 0)
      ```
- ## Thread Pooling
  - By default NodeJS is a single threaded language. But at OS level, it doesn't work like that. 
  - To run NodeJS, OS assigns one core to NodeJS, and for rest other processes, OS assigns the cores.
    ```
    const http = require('http');

    const bcrypt = require('bcrypt');
    const saltRounds = 2;
    const myPlaintextPassword = 's0/\/\P4$$w0rD';
    /*
    command to hit many times: ab -n 1000 -c 100 "http://localhost:5000/" | grep -i Requests
    for process.env.UV_THREADPOOL_SIZE = 
        1: Requests per second:    622.34 [#/sec] (mean)
        2: Requests per second:    1197.86 [#/sec] (mean)
        3: Requests per second:    1772.86 [#/sec] (mean)
        4: Requests per second:    2132.06 [#/sec] (mean)
        5: Requests per second:    2519.59 [#/sec] (mean)

    */

    const server = http.createServer((req, res) => {
        bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.write(hash)
            res.end();
        });
    })
    server.listen(5000, () => {
        console.log("Server is up and running on 5000")
    })
    ```
  - Here in package.json, start script is configured as 
      - **```set UV_THREADPOOL_SIZE=1 & nodemon index.js```**
      - By default UV_THREADPOOL_SIZE is 4 and when we change from 1...and so on:
          - 1: Requests per second:    622.34 [#/sec] (mean)
          - 2: Requests per second:    1197.86 [#/sec] (mean)
          - 3: Requests per second:    1772.86 [#/sec] (mean)
          - 4: Requests per second:    2132.06 [#/sec] (mean)
          - 5: Requests per second:    2519.59 [#/sec] (mean)
      - above data is got by running in apache benchmark by running following command
          - ```ab -n 1000 -c 100 "http://localhost:5000/" | grep -i Requests```
      - With thread-pool count, requests/seconds are also getting increased.  
- ## Event Looping: (Internal Working)
  - NodeJS is built on 2 things:
    - V8 Engine: Built on C++ to run Javascript
    - LibUV: a library to implement **Event Loop** and **Thread Pool**
  - Code execution steps:
    - When running **node index.js**:
      - node creates **Node Process** which contains:
      - **Main Thread**: which do the following:
        - Initialize the project
        - Execution of top level code (Which are not in functions)
        - Execute require("module_name") code
        - Event callback register
        - Starts event loop
      - **Thread pool**: for CPU intensive tasks, we use threads but not main thread and CPU intensive tasks include: - fs - Crypto related tasks - compression - database related
        -- Event loop offloads CPU intensive tasks to threads.
        -- By default there are 4 threads and they can go upto 1024
        -- The worker pool size in NodeJS is changed from 128 to 1024 in V10.5.0. Prior to this version, the default worker pool size was 128. And 1024 can be increased by setting **UV_THREADPOOL_SIZE** environmental variable.
      - In Event loop order of execution is like:
        - Expired Timer callbacks (SetTimeout, SetInterval)
        - IO pooling like fs
        - SetImmediate Callbacks - CBS
        - Close callbacks - Socket, Server close related
        - Checks Pending tasks
        - if No pending tasks: EXIT
        - Else repeat the Event loop
    - Note: Promised callbacks are executed between the transition from one phase to another. Example if there is an promise resolved and now event loop is changed from timer callbacks to IO, then those promises are executed and goes to IO and so on.

    ```
    const fs = require('fs);
    SetTimeout(() => {
        console.log("Logged from SetTimeout")
    }, 0);
    console.log("Logged from console")

    -- Here:
        --> console.log("Logged from console") is top level code and it executes first and on main thread.
        --> SetTimeout runs on event loop and executes later.
     ```

    ```
    const fs = require('fs);
    SetTimeout(() => {
        console.log("Logged from SetTimeout")
    }, 0);
    setImmediate(() => {
        console.log('immediate');
    });
    console.log("Logged from console")

    -- Here:
        --> console.log("Logged from console") is top level code and it executes first and on main thread.
        --> SetTimeout runs on event loop and executes later.
        --> setImmediate executes later
    ```
    ```
    SetTimeout(() => {
        console.log("Logged from SetTimeout")
    }, 0);
    setImmediate(() => {
        console.log('immediate');
    });
    ```
      - Here in the absence of console.log, it gives output differently.
      - If we run the following script which is not within an I/O cycle (i.e. the main module), the order in which the two timers are executed is non-deterministic, as it is bound by the performance of the process.
      - However, if you move the two calls within an I/O cycle, the immediate callback is always executed first:
      - The main advantage to using setImmediate() over setTimeout() is setImmediate() will always be executed before any timers if scheduled within an I/O cycle, independently of how many timers are present.
          
    ```
    const fs = require('node:fs');

    fs.readFile(__filename, () => {
        setTimeout(() => {
            console.log('timeout');
        }, 0);
        setImmediate(() => {
            console.log('immediate');
        });
    });
    ```
  - Example:
      ```
      const fs = require('fs')
      const crypto = require('crypto')
      setTimeout(() => console.log("Set Timeout: 1"), 0);

      setImmediate(() => console.log("Set Immediate: 1"))
      const start = Date.now()

      fs.readFile("./data.txt", "utf-8", () => {
          console.log("Clg from IO");
          setTimeout(() => console.log("Set Timeout: 2"), 0);
          setTimeout(() => console.log("Set Timeout: 3"), 5000);
          setImmediate(() => console.log("Set Immediate: 1"))

          crypto.pbkdf2("password1", "salt1", 100000, 1024, "sha512", () => {
              console.log(Date.now() - start, "Password1 is done")
          })
          crypto.pbkdf2("password2", "salt1", 100000, 1024, "sha512", () => {
              console.log(Date.now() - start, "Password2 is done")
          })
          crypto.pbkdf2("password3", "salt1", 100000, 1024, "sha512", () => {
              console.log(Date.now() - start, "Password3 is done")
          })
          crypto.pbkdf2("password4", "salt1", 100000, 1024, "sha512", () => {
              console.log(Date.now() - start, "Password4 is done")
          })
          crypto.pbkdf2("password5", "salt1", 100000, 1024, "sha512", () => {
              console.log(Date.now() - start, "Password5 is done")
          })
          crypto.pbkdf2("password6", "salt1", 100000, 1024, "sha512", () => {
              console.log(Date.now() - start, "Password6 is done")
          })
          crypto.pbkdf2("password7", "salt1", 100000, 1024, "sha512", () => {
              console.log(Date.now() - start, "Password7 is done")
          })
      })

      console.log("Clg from bottom")

      //-------------------[OUTPUT STARTS]-------------------//
      Clg from bottom
      Set Timeout: 1
      Set Immediate: 1
      Clg from IO
      Set Immediate: 1
      Set Timeout: 2
      1400 Password1 is done
      1426 Password3 is done
      1444 Password4 is done
      1519 Password2 is done
      2720 Password5 is done
      2830 Password7 is done
      2857 Password6 is done
      Set Timeout: 3
      //-------------------[OUTPUT END]-------------------//

      //-------------------[Explanation STARTS]-------------------//
      1. Top line code: Clg from bottom
      2. Expired timeout: Set Timeout: 1
      //------Still file is reading-------//
      3. setImmediate: Set Immediate: 1
      4. Entered IO and top level code: Clg from IO
      5. Next priority after IO is setImmediate and thus it logged else setTimeout has to get executed as per event loop: Set Immediate: 1
      6. Expired timeout: Set Timeout: 2
      7. CPU intensive op and run on thread num: 
          1 -> 1400 Password1 is done
          2 -> 1426 Password3 is done
          3 ->1444 Password4 is done
          4 -> 1519 Password2 is done
          1 -> 2720 Password5 is done
          2 -> 2830 Password7 is done
          3 -> 2857 Password6 is done
          process.env.UV_THREADPOOL_SIZE default size is 4 but if we set it to 2 then: 
              1 -> 400 Password1 is done
              2 -> 400 Password3 is done
              1 ->800 Password4 is done
              2 -> 800 Password2 is done
              1 -> 1200 Password5 is done
              2 -> 1200 Password7 is done
              1 -> 1600 Password6 is done
      8. Timeout expired: Set Timeout: 3
      //-------------------[Explanation END]-------------------//
      ```
      
  - Reference: [event-loop-timers-and-nexttick](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)


## Misc:
### URL - Uniform Resource Locator
- https://www.govind.dev/projects/react?topic=hooks+useEffect&usage=3
  - **https**: Protocol means a set of rules which tells browser to how to communicate
  - **www.govind.dev**: Domain-User friendly name of IP Address.
  - **/projects**: path
  - **/react**: nested path
  - **topic=hooks+useEffect&usage=3**: query params and it starts with ?