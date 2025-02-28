import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Note from "../models/note.model.js";

const register = async(req, res)=> {
    const {fullName, email, password} = req.body;
    if(!fullName){
        return res
        .status(400)
        .json({error: true, message: "Fullname is required"})
    }

    if(!email){
        return res
        .status(400)
        .json({error: true, message: "Email is required"})
    }
    if(!password){
        return res
        .status(400)
        .json({error: true, message: "Password is required"})
    }

    const isUser = await User.findOne({email: email});

    if(isUser){
        return res.json({
            error: true,
            message: "User already exist"
        })
    }

    const user = new User({
        fullName,
        email,
        password
    });
    await user.save();

    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m"
    });
    return res.json({
        error: false,
        user,
        accessToken,
        message: "User registered"
    })
}


const login = async(req, res) => {
    const {email, password} = req.body;
    if(!email){
        return res
        .status(400)
        .json({error: true, message: "Email is required"})
    }
    if(!password){
        return res
        .status(400)
        .json({error: true, message: "Password is required"})
    }

    const userInfo = await User.findOne({email: email});

    if(!userInfo){
        return res
        .status(400)
        .json({error: true, message: "User not exist"})
    }

    if(userInfo.email == email && userInfo.password == password){
        const user = {user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });
        
        return res.json({
            error: false,
            message: "Logged In",
            email,
            accessToken,

        })
    }else{
        return res.status(400).json({
            error: true,
            message: "Invalid credentials",
        })
    }

}

const addNote = async(req, res) => {
    const {title, content, tags} = req.body;

    const {user} = req.user;
    if(!title || !content){
        return res.status(400).json({error: true, message: "Please enter the details"})
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        })
        await note.save()

        return res.json({
            error: false,
            note,
            message: "Note added successfully"
        })
    } catch (error) {
        console.error("Error while adding note:", error);
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })
    }
}

export {
    register,
    login,
    addNote
}