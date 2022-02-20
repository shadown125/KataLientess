import useSWR from "swr";
import Image from "next/image";
import {fetcher} from "../../lib/fetcher";

function Profile() {
    const { isValidating, data, error} = useSWR('/api/user/getProfile', fetcher);

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