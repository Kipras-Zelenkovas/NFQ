const URL = "http://127.0.0.1:8000/api/reservation";
const SpecialistUrl = "http://127.0.0.1:8000/api/specialist";

export const reserve = async () => {
    try {
        if (localStorage.getItem("code") === null) {
            const res = await fetch(URL, { method: "POST" });

            if (!res.ok) {
                console.log(`Error! Status: ${res.status}`);
            } else {
                const date = new Date().getTime();
                const date15 = new Date(date + 900000);

                const result = await res.json();

                localStorage.setItem("code", result.code);
                localStorage.setItem(
                    "aproxTime",
                    date15.getHours() + ":" + date15.getMinutes()
                );
            }
        } else {
            alert("You already reserved an session");
        }
    } catch (error) {
        console.log(error);
    }
};

export const cancelReservation = async () => {
    try {
        if (
            localStorage.getItem("code") !== null &&
            localStorage.getItem("aproxTime") !== null
        ) {
            const params = new URLSearchParams({
                code: localStorage.getItem("code"),
            });
            const res = await fetch(URL, {
                method: "DELETE",
                body: params,
            });

            if (!res.ok) {
                console.log(`Error! Status: ${res.status}`);
            } else {
                localStorage.removeItem("code");
                localStorage.removeItem("aproxTime");
            }
        } else {
            alert("You don't have a reservation");
        }
    } catch (error) {
        console.log(error);
    }
};

export const cancelReservationSpec = async (code) => {
    try {
        if (localStorage.getItem("token") !== null) {
            const params = new URLSearchParams({
                code: code,
            });
            const res = await fetch(URL, {
                method: "DELETE",
                body: params,
            });

            if (!res.ok) {
                console.log(`Error! Status: ${res.status}`);
            }
        } else {
            alert("You don't have permission for this action");
        }
    } catch (error) {
        console.log(error);
    }
};

export const startSession = async (code) => {
    try {
        const params = new URLSearchParams({
            code: code,
        });
        const res = await fetch(URL, {
            method: "PUT",
            body: params,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!res.ok) {
            console.log(`Error! Status: ${res.status}`);
        } else {
            console.log("Session has started");
        }
    } catch (error) {
        console.log(error);
    }
};

export const getUpcoming = async () => {
    try {
        const res = await fetch(URL);

        if (!res.ok) {
            console.log(`Error! Status: ${res.status}`);
        } else {
            const result = await res.json();

            return result;
        }
    } catch (error) {
        console.log(error);
    }
};

export const getReservations = async () => {
    try {
        if (localStorage.getItem("token") !== null) {
            const res = await fetch(SpecialistUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!res.ok) {
                console.log(`Error! Status: ${res.status}`);
            } else {
                const result = await res.json();

                return result;
            }
        } else {
            alert("You don't have permission for this action");
        }
    } catch (error) {
        console.log(error);
    }
};

export const check = async () => {
    try {
        if (localStorage.getItem("code") !== null) {
            const params = new URLSearchParams({
                code: localStorage.getItem("code"),
            });
            const res = await fetch(URL + "/check", {
                method: "POST",
                body: params,
            });

            if (!res.ok) {
                console.log();
            } else {
                const result = await res.json();

                if (result.data === false) {
                    localStorage.removeItem("code");
                    localStorage.removeItem("aproxTime");
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};
