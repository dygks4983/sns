import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import Axios from "axios";
import { useHistory } from "react-router";

export default function Signup() {
    const history = useHistory();

    const [inputs, setInputs] = useState({ username: "", password: ""});
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formDisabled, setFromDisabled] = useState(true);

    const onSubmit = e => {
        e.preventDefault();

        setLoading(true);
        setErrors({});

        Axios.post("http://localhost:8000/accounts/signup/", inputs)
            .then(response => {
                console.log("reponse :", response);
                history.push("/accounts/login");
            })
            .catch(error => {
                console.log("error :", error);
                if (error.response) {
                    setErrors({
                        username: (error.response.data.username || []).join(" "),
                        password: (error.response.data.password || []).join(" ")
                    });
                }
                
            })
            .finally(() => {
                setLoading(false);
            })
    };

    useEffect(() => {
        const isenabled = Object.values(inputs).every( s => s.length > 0)
        setFromDisabled(!isenabled); 
    }, [inputs]) 

    const onChange = e => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev, 
            [name]: value
        }));
    };

    return <div>
        <form onSubmit={onSubmit}>
            <div>
                <input type="text" name="username" onChange={onChange}/>
                {errors.username && <Alert type="error" message={errors.username}/>}
            </div>
            <div>
                <input type="password" name="password" onChange={onChange}/>
                {errors.password && <Alert type="error" message={errors.password}/>}
            </div>
            
            <input type="submit" value="회원가입" disabled={loading || formDisabled} />
        </form>
    </div>
}