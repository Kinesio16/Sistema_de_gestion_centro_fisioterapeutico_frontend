import axiosClient from "./axiosClient";

export async function getCitas() {

    const response =
        await axiosClient.get("/citas");

    return response.data.data;

}

export async function getCitaById(id) {

    const response =
        await axiosClient.get(`/citas/${id}`);

    return response.data.data;

}

export async function createCita(data) {

    const response =
        await axiosClient.post("/citas", data);

    return response.data.data;

}

export async function updateCita(id, data) {

    

    try {

        const response = await axiosClient.put(`/citas/${id}`, data);

        return response.data.data;

    } catch (error) {

        console.log("Status:", error.response?.status);
        console.log("Body:", error.response?.data);
        console.log("Errores:", error.response?.data?.data);
        console.table(error.response?.data?.data);

        throw error;

    }

}

export async function cancelarCita(id) {

    const response =
        await axiosClient.patch(
            `/citas/${id}/cancelar`
        );

    return response.data;

}