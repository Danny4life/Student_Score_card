import { FC, useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FormInput, Card, FormButton, Form, FormInput2 } from "../component";
import { Heading, Paragraph2, Card2, ProfileImage } from "../styling/css";
import { FaPencilAlt } from 'react-icons/fa';
import axios from "axios";
import swal from "sweetalert"


type PageProps = {}

const BASEURL = process.env.REACT_APP_BASEURL;

const DevProfile = (props: PageProps): JSX.Element => {
    const [loaded, setLoaded] = useState(false);
    const imageRef = useRef(HTMLInputElement.prototype);
    const [formContent, setFormContent] = useState({
        email: '',
        imageUrl: '',
        firstName: '',
        squad: [],
        stack: {
            name: '',
        },
        lastName: ''
    });

    const handleImageButtonClick = () => {
        if (imageRef.current instanceof HTMLInputElement) {
            imageRef.current?.click()
        }
    }

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore: Object is possibly 'null'.
        if (e.currentTarget.files[0]) {
            try {
                // @ts-ignore: Object is possibly 'null'.
                const result = await axios.put(`${BASEURL}/users/upload/${localStorage.getItem('id')}`, { image: e.currentTarget.files[0] }, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if (result.status === 200) {
                    setFormContent({ ...formContent, imageUrl: result.data.imageUrl });
                    swal('Success', 'Profile Image updated', "success");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                }
            } catch (err: any) {
                /** replace with custom contextual error message */
                if (err?.response.data.error) {
                    const message = err?.response.data.error.includes('E1100') ? 'A user already exists with this email' : err?.response.data.error;
                    swal('Failed', message, "error");
                }
                console.error(err);
            }
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const {
            firstName,
            lastName
        } = formContent;
        try {
            const result = await axios.patch(`${BASEURL}/users/edit/${localStorage.getItem('id')}`, { firstName, lastName }, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (result.status === 201) {
                swal('Success', 'Profile details updated', "success");
                setFormContent({ ...result.data });
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }
        } catch (err: any) {
            /** replace with custom contextual error message */
            if (err?.response.data.error) {
                const message = err?.response.data.error.includes('E1100') ? 'A user already exists with this email' : err?.response.data.error;
                swal('Failed', message, "error");
            }
            console.error(err);
        }
    }


    useEffect(() => {
        axios.get(`${BASEURL}/users/profile/${localStorage.getItem('id')}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((data) => {
                console.log(data.data)
                setFormContent(data.data);
                setLoaded(true);
            }).catch((err) => {
                console.error(err)
            })
    }, [])


    //useMemo to call api for profile image

    return (
        <div style={{ width: '73rem', marginBottom: '4rem' }}>
            <Heading>Profile</Heading>
            <Card2>
                <Paragraph2>
                    ONLY YOU CAN EDIT YOUR PROFILE
                </Paragraph2>
                <ProfileImage>
                    <div>
                        {
                            loaded && formContent.imageUrl !== '#' ?
                                <img src={formContent?.imageUrl} alt="profile" style={{ width: '10rem', height: '10rem', objectFit: 'cover', clipPath: 'circle(50%)' }} />
                                :
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "4rem" }}>
                                    <path d="M23.3333 0.666748H4.66666C2.45849 0.66919 0.669106 2.45858 0.666664 4.66675V16.7579V23.3334C0.669106 25.5416 2.45849 27.331 4.66666 27.3334H23.3333C23.5764 27.3331 23.8162 27.3041 24.0527 27.2602C24.1409 27.2441 24.2249 27.2197 24.3109 27.1979C24.4523 27.1618 24.5911 27.1197 24.7276 27.0683C24.8269 27.0311 24.9238 26.9921 25.0192 26.9474C25.1312 26.8947 25.2382 26.8336 25.3451 26.7704C25.4454 26.7115 25.5467 26.6562 25.6411 26.5891C25.6488 26.5836 25.6576 26.5799 25.6654 26.5743C25.6753 26.5671 25.6838 26.5583 25.6934 26.5505C25.7116 26.5358 25.7345 26.5286 25.7511 26.5119C25.76 26.503 25.7628 26.4911 25.771 26.4819C26.714 25.7502 27.3319 24.6191 27.3333 23.3334V19.4272V4.66675C27.3309 2.45858 25.5415 0.66919 23.3333 0.666748ZM24.0999 25.8739C23.8512 25.951 23.594 25.9999 23.3333 26.0001H4.66666C3.19466 25.9982 2.00187 24.8054 2 23.3334V17.0339L7.01692 12.017C7.92895 11.1082 9.40438 11.1082 10.3164 12.017L14.8562 16.5564C14.8587 16.559 14.8594 16.5625 14.862 16.5651L24.154 25.8571C24.1361 25.863 24.118 25.8684 24.0999 25.8739ZM26 23.3334C25.9991 24.0218 25.7306 24.643 25.3021 25.116L16.2775 16.0923L17.6849 14.685C18.6065 13.8022 20.0601 13.8022 20.9818 14.685L26 19.7032V23.3334ZM26 17.8178L21.9245 13.7423C20.4928 12.3126 18.1738 12.3126 16.7422 13.7423L15.3348 15.1497L11.2591 11.0743C9.82649 9.64461 7.50683 9.64461 6.07422 11.0743L2 15.1485V4.66675C2.00187 3.19474 3.19466 2.00195 4.66666 2.00008H23.3333C24.8053 2.00195 25.9981 3.19474 26 4.66675V17.8178ZM16 6.00008C14.8954 6.00008 14 6.89551 14 8.00008C14 9.10465 14.8954 10.0001 16 10.0001C17.1041 9.99886 17.9988 9.10417 18 8.00008C18 6.89551 17.1046 6.00008 16 6.00008ZM16 8.66675C15.6318 8.66675 15.3333 8.36825 15.3333 8.00008C15.3333 7.63192 15.6318 7.33341 16 7.33341C16.3679 7.33415 16.6659 7.63216 16.6667 8.00008C16.6667 8.36825 16.3682 8.66675 16 8.66675Z" fill="#21334F" />
                                </svg>
                        }
                        <button onClick={handleImageButtonClick}>
                            <FaPencilAlt style={{ fontSize: '1rem', color: '#fff' }} />
                        </button>
                        <input type="file" name="email" id="" style={{ display: 'none' }} ref={imageRef} onChange={handleImageChange} />
                    </div>
                </ProfileImage>
                {loaded ?
                    <Form onSubmit={handleSubmit} >
                        <FormInput2
                            name="firstName"
                            placeholder="Enter First Name"
                            label="First Name"
                            type="text"
                            firstValue={formContent?.firstName}
                            setSharedState={(e: string) => {
                                setFormContent({
                                    ...formContent,
                                    firstName: e
                                })
                            }}
                            errorMsg="First name cannot be blank"
                        />
                        <FormInput2
                            name="lastName"
                            placeholder="Enter Last Name"
                            label="Last Name"
                            type="text"
                            firstValue={formContent?.lastName}
                            setSharedState={(e: string) => {
                                setFormContent({
                                    ...formContent,
                                    lastName: e
                                })
                            }}
                            errorMsg="Last name cannot be blank"
                        />
                        <FormInput2
                            name="email"
                            placeholder="Enter Email"
                            label="Email"
                            type="email"
                            errorMsg="Please enter a valid email address"
                            presetValue={formContent?.email}
                            disabled
                        // firstValue="Name cannot be blank"
                        />
                        <FormInput2
                            name="stack"
                            placeholder="Nodejs, Python, Android"
                            label="Stack"
                            type="text"
                            errorMsg="Please enter a valid Stack"
                            presetValue={formContent?.stack?.name}
                            disabled
                        />
                        <FormInput2
                            name="squad"
                            placeholder="SQ0011"
                            label="Squad"
                            type="text"
                            errorMsg="Please enter a valid Squad e.g. - SQ0012"
                            presetValue={`${formContent?.squad}`}
                            disabled
                        />

                        <FormButton text="Save" />
                    </Form>
                    :
                    null
                }
            </Card2>
        </div>)
}

export default DevProfile;