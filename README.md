# cabinet.js
A simple interface for accessing local and session storage.

### Installation
```bash
npm install cabinet-storage
```

### Implementation Example
```js
// import the Cabinet module
import Cabinet from "cabinet-storage"
```

### Methods

Cabinet uses local storage by default. Access session storage under the `Cabinet.session` namespace.

**```Cabinet.set(key, val[, metadata])```**

> Creates an item inside local storage

**Parameters**
1. `key` (**String | Number**)
2. `val` (**Any**)
3. `metadata` (**Object: optional**)

**Examples**

```js

Cabinet.set("dog", "Scooby") // returns "Scooby"
Cabinet.set("total", 50/(10-5)) // 10
Cabinet.set("person", {name: "Michael", age: 26, gender: "Male"}); // storing objects
Cabinet.set("animals", ["lion", "tiger", "bear"]); // storing arrays
Cabinet.set("friends", [{name: "Stan"}, {name: "Wendy"}]); // storing collection
Cabinet.set("check", true); // true
Cabinet.set("reminder", new Date(Date.now() + 1000)); // Mon Feb 26 2018 21:47:15 GMT-0800 (Pacific Standard Time)

```
**Working with expirations**

```js

// set an expiration using a new Date instance
Cabinet.set("reminder", "Thanks a ton", {
  expires: new Date(Date.now() + 300000000)
})

// set an expiration to 30 days from now
Cabinet.set("partyime", "It's time to party", {
 expires: {value: 30, unit: "day"} // returns "It's time to party"
})

Cabinet.set("dueDate", "Project due", {
 expires: {value: 3, unit: "hour"}
})

// time units: "day", "hour", "minute", "second"

```

- - -

**```Cabinet.get(key[, defaultVal])```**

> Retrieves an item from local storage if it exists

**Parameters**
1. `key` (**String | Number**)
2. `defaultVal` (**Any: optional**)

**Examples**

```js

Cabinet.get("friends") // returns [{name: "Stan"}, {name: "Wendy"}]

// items that don't exist return null
Cabinet.get("doesntExist") // null

// iterating through a collection
Cabinet.get("friends").map(item => {
 let name = item.name
})

```

**Default Values**

```js

// If the item doesn't exist in local storage and a default value is provided, Cabinet will call the set method
Cabinet.get("todos", []) // returns []
Cabinet.get("nameField", "Enter Your Name") // "Enter Your Name"

```

- - -

**```Cabinet.getAll()```**

> Retrieves all items from local storage

**Examples**

```js

// returns an array containing all of the values in local storage
Cabinet.getAll() // ["reminder", 123, [], {name: "Stan"}]

// filter out numbers
Cabinet.getAll().filter(val => typeof val === "number") // filtered array

```

- - -

**```Cabinet.remove(key)```**

> Removes an item from local storage if it exists

**Parameters**
1. `key` (**String | Number**)

**Examples**

```js

Cabinet.remove("reminder") // returns true

```

- - -

**```Cabinet.removeAll()```**

> Removes all items from local storage

**Examples**

```js

Cabinet.removeAll() // returns true

```

- - -

**```Cabinet.getMetadata(key)```**

> Retrieves a set of attributes that Cabinet stores with an item inside local storage

**Parameters**
1. `key` (**String | Number**)

**Examples**

```js
// readable properties

const friends = Cabinet.getMetadata("friends") // returns the metadata object {}

friends.dateCreated // date string
friends.expires // date string or null (if not provided)
friends.source // "CABINET_STORAGE"
friends.type // datatype (string)
friends.val // the stored value

// retrieve the expiration date
let expires = new Date(Cabinet.getMetadata("reminder").expires) // Thu Mar 08 2018 21:40:24 GMT-0800 (Pacific Standard Time)

// check if the item came from Cabinet
if (Cabinet.getMetadata("reminder").source === "CABINET_STORAGE") {
 // do stuff...
}
```

- - -

**```Cabinet.removeExpired()```**

> Removes all expired items from local storage

**Examples**

```js
// returns an array containing the keys of the removed items
Cabinet.removeExpired() // ["key1", "key2", "key3"]

// no expired items
Cabinet.removeExpired() // null
```

- - -

**```Cabinet.count()```**

> Returns a count of the number of items saved in local storage

**Examples**

```js
Cabinet.count() // 3
```

- - -

**```Cabinet.keys()```**

> Returns an array containing all of the keys in local storage

**Examples**

```js
Cabinet.keys() // ["key1", "key2", "key3"]
```

- - -

#### Session Storage Usage

**```Cabinet.session.methodName()```**

> Access session storage under the Cabinet.session namespace.

```js
Cabinet.session.get(key)
Cabinet.session.set(key, val)
Cabinet.session.getAll()
Cabinet.session.remove(key)
Cabinet.session.removeAll()
Cabinet.session.getMetadata()
Cabinet.session.removeExpired()
Cabinet.session.keys()
Cabinet.session.count()
```

### Development Build
```bash
# install dependencies
npm install --save-dev

# run demo build
npm run demo
```
Next, open `/demo/dist/index.html` in your browser.
Interact with the module from `/demo/src/demo.js`.  You can log output to the console or render output to the examples index page.

### Production Build
```
npm run build
```
production build is output to `/dist/main.js`