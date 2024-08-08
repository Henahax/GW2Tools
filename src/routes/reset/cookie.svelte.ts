let myName: string;
let myValue: string;

function setCookie(name: string, value: string) {
	myName = name;
	myValue = value;
}

function getCookieValue(name: string) {
	myName = name;
	return myValue;
}

$effect(() => {
	localStorage.setItem(myName, JSON.stringify(myValue));
});

$effect(() => {
	const value = localStorage.getItem(myName);
	if (value) myValue = JSON.parse(value);
});
