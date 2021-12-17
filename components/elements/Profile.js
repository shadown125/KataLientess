import useSWR from "swr";
import {useState, useEffect} from "react";
import Image from "next/image";

function Profile() {
    const [username, setUsername] = useState([]);
    const [image, setImage] = useState('');

    const {data, error} = useSWR('/api/user/getProfile', async (url) => await fetch(url).then(async res => await res.json()), { refreshInterval: 10 });

    useEffect(() => {
        if (data) {
            setUsername(data);
            setImage(data.image);
        }
    }, [data]);

    if (image) {
        return (
            <div className="profile">
                <div className="image-wrapper">
                    <Image src={image} alt="Profile Image" width={200} height={200}/>
                </div>
                <div className="content">
                    <div>{username.firstName}</div>
                    {username.lastName && (
                        <div>{username.lastName}</div>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default Profile;