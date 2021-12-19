import useSWR from "swr";
import {useState, useEffect} from "react";
import Image from "next/image";

function Profile(props) {
    const [username, setUsername] = useState([]);
    const [image, setImage] = useState('');

    const {data, error} = useSWR('/api/user/getProfile', async (url) => await fetch(url).then(async res => await res.json()));

    useEffect(() => {
        if (props.profileData) {
            setUsername(props.profileData);
            setImage(props.profileData.image);
        } else {
            if (data) {
                setUsername(data);
                setImage(data.image);
            }
        }
    }, [data, props]);

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
    }
    return (
        <div className="profile is-loading">
            <div className="image-wrapper">
                <div className="image" />
            </div>
            <div className="content">
                <div />
                <div />
            </div>
        </div>
    )
}

export default Profile;