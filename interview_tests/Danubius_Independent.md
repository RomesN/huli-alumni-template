## Short questions

-   GIT is a version system. It make easier to track different versions of a software or history of a software development.
-   HTTP is Hypertext Transfer Protocol, it is standard for client-server communication. The most common methods are GET, POST, PUT, PATCH or DELETE.
-   S in HTTPS stands for secure, so in case of HTTPS the communication is encrypted.
-   Tags:
    -   <div> is used for dividing an HTML document into parts, so it can be e. g. formatted separately,
    -   <span> is used to format only some part of inline text (e. g. word),
    -   <p> stands for paragraph, so it is used for block of text,
    -   <a href="...">...<a> is anchor tag used mainly for a link.
-   Dependency injection is used for providing an object some another object which is dependent on instead of letting it create it on its own.
-   I love variety of creating both frontend and backend features of web application in JavaScript/TypeScript with help of freamworks React.js and Express/Node.js in the backend.

## Programming task

I would use hashmap/dictionary/or object in JS. Name of the structure depends on a language.

-   JS:

```
const length = {
	mm: 0.001,
	cm: 0.01,
	dm: 0.1,
	m: 1,
	km: 1000,
}

const weight = {
	mg: 0.001,
	g: 1,
	dkg: 10,
	kg: 1000,
	t: 1000000
}

// Listing types
console.log(Object.keys(length));
console.log(Object.keys(weight));

// Querying multipliers
console.log(length.km);
console.log(weight.g);

// Returning base unit
function returnBaseLength (baseAsString) {
	cont arr = baseAsString.split(" ");
	return parseInt(arr[0]) * length[arr[1]];
}
```

-   Java:

```
public class main {
	public static main(String[] args) {

		HashMap<String, Float> length = new HashMap<>();
		length.put("mm", 0.001F);
		length.put("cm", 0.01F);
		length.put("dm", 0.1F);
		length.put("m", 1F);
		length.put("km", 1000F);

		for (Map.Entry<String, Float> entry : length.entrySet()) {
			System.out.println(entry.getKey());
		}
		System.out.println(length.get("mm"));
	}
}
```
