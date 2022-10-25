async function getUsers() {
	const userResults = await fetch('https://jsonplaceholder.typicode.com/users');
	const users = await userResults.json()
	return users;

}
async function showUserPosts(id) {

	const postResults = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + id);
	const posts = await postResults.json();
	postHTML = "";
	for (let i = 0; i < posts.length; i++) {
		postHTML += "<p><b> " + posts[i].title + ": </b>" + posts[i].body + "</p>";
	}
	document.getElementById("postsCell").innerHTML = postHTML;

	userTDs = document.querySelectorAll(".userTD");
	userTDs.forEach(u => u.classList.remove('selected'));

	document.getElementById(id).classList.add('selected');
}
window.onload = async function() {

	const users = await getUsers();

	let tableString = "<tr><td><b>Users</b></td></tr>";
	for (let i = 0; i < users.length; i++) {
		tableString += "<tr><td class='userTD' id='" + users[i].id + "'>" + users[i].name + "</td></tr>";
	}
	const table = document.getElementById('userTable');
	table.innerHTML = tableString;

	userTDs = document.querySelectorAll(".userTD");
	userTDs.forEach(u => u.addEventListener("click", function() {
		showUserPosts(u.id)
	}));

	showUserPosts(1);
}