import useSWR from "swr";
import {useState, useEffect} from "react";
import Image from "next/image";

function Profile() {
    const [username, setUsername] = useState([]);

    const {data, error} = useSWR('/api/user/getUsername', (url) => fetch(url).then(res => res.json()), { refreshInterval: 10 });

    useEffect(() => {
        if (data) {
            setUsername(data);
        }
    }, [data])

    return (
        <div className="profile">
            <div className="image-wrapper">
                <Image src="/dummyProfileImage.jpg" alt="Profile Image" width={200} height={200}/>
            </div>
            <div className="content">
                <div>{username.firstName}</div>
                {username.lastName && (
                    <div>{username.lastName}</div>
                )}
            </div>
        </div>
    );
}

export default Profile;