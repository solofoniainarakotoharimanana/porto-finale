
import API from "./api.js";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    //Append image fie to formData
    formData.append('profileImg', imageFile);

    try {
        const response = await API.post('/auth/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading the image ", error);
        throw error
    }

}



export default uploadImage;