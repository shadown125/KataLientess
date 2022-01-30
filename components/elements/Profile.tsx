import useSWR from "swr";
import Image from "next/image";

function Profile() {
    const { isValidating, data, error} = useSWR('/api/user/getProfile', async (url) => await fetch(url).then(async res => await res.json()));

    return (
        <>
            {isValidating && !error ?
                (
                    <div className="profile is-loading" data-testid="nav-profile-is-loading">
                        <div className="image-wrapper">
                            <div className="image" />
                        </div>
                        <div className="content">
                            <div />
                            <div />
                        </div>
                    </div>
                )
                :
                (
                    <div className="profile">
                        <div className="image-wrapper">
                            <Image src={data.image} alt="Profile Image" width={200} height={200}/>
                        </div>
                        <div className="content">
                            <div>{data.firstName}</div>
                            {data.lastName && (
                                <div>{data.lastName}</div>
                            )}
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Profile;