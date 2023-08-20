const URL = "http://127.0.0.1:8000/api/specialist/";

export const login = async (email, password) => {
    try {
        const params = new URLSearchParams({
            email: email,
            password: password,
        });
        const res = await fetch(URL + "login", {
            method: "POST",
            body: params,
        });

        if (!res.ok) {
            alert("Bad login credentials");
        }

        const result = await res.json();
        console.log(result);

        localStorage.setItem("token", result.token);

        console.log("Successfull login");
    } catch (error) {
        console.log(error);
    }
};

export const logout = async () => {
    try {
        if (localStorage.getItem("token") !== null) {
            const res = await fetch(URL + "logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!res.ok) {
                console.log(
                    `Error, something went wrong! Status: ${res.status}`
                );
            }

            localStorage.removeItem("token");

            console.log("Successfull logout");
        } else {
            alert("You don't have permission for this action");
        }
    } catch (error) {
        console.log(error);
    }
};
