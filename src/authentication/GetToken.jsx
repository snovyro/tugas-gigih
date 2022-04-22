const getToken = () => {
	const hash = window.location.hash;
	let token = window.localStorage.getItem("token");
  
	if (!token && hash) {
	  const token = hash
		.substring(1)
		.split("&")
		.find((elem) => elem.startsWith("access_token"))
		.split("=")[1];
		
	  window.location.hash = "";
	  window.localStorage.setItem("token", token);
	}
	return token;
  };

  export {getToken}