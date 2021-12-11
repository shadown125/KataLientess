import useSWR from "swr";
import {useState, useEffect} from "react";

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
                <img src="/dummyProfileImage.jpg" alt="Profile Image"/>
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