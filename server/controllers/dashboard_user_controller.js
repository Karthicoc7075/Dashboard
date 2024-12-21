

const DashboardUser = require('../models/dashboard_user_model');
const bcrypt = require('bcrypt');
const CustomError = require('../errors');


exports.getUsers = async(req,res,next) => {
    try {
        const users = await DashboardUser.find();
        const userData = users.map(user => {
            return { username: user.username, email: user.email, _id: user._id, role: user.role, status: user.status };
        });
        return res.status(200).json({ data: userData });
    } catch (error) {
        next(error)
    }
}



exports.getUser = async(req,res,next) => {
    const userId = req.params.userId;
    try {
        const user = await DashboardUser.findById(userId);
        if (!user) {
            throw new CustomError.NotFoundError('User not found');
        }
        const userData = { username: user.username, email: user.email, _id: user._id, role: user.role, status: user.status };
        return res.status(200).json({ data: userData });
    } catch (error) {
        next(error)
    }
}

exports.createUser = async (req, res,next) => {
    try {
        const { username, email, password,role,status } = req.body;
        if ( !username || !email || !password || !role ) {
            throw new CustomError.BadRequestError('All fields are required');
        }
    
        let existingUser = await DashboardUser.findOne({ email: email });
        if (existingUser) {
          throw new CustomError.BadRequestError('User already exists');
       
          
        }
         existingUser = await DashboardUser.findOne({username: username});

          if(existingUser && existingUser.username == username){
            throw new CustomError.BadRequestError('Username already exists');
        }
      

    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new DashboardUser({
            username: username,
            password: hashedPassword,
            email: email,
            role:role,
            status:status
        });
    
        const newUser = await user.save();
        const data = { username: newUser.username, email: newUser.email, _id: newUser._id, role: newUser.role};
        return res.status(201).json({ message: 'User registered successfully', data });
    } catch (error) {
      next(error)
    }
};

exports.updateUser = async(req,res,next) => {
    const userId = req.params.userId;
    
    try {
        const { username, email, role,password, status } = req.body;
        if (!username || !email || !role) {
            throw new CustomError.BadRequestError('All fields are required');
        }
        const user = await DashboardUser.findById(userId);
        if (!user) {
            throw new CustomError.NotFoundError('User not found');
        }
    let userUpdatedData
        if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
     
            userUpdatedData = { username, email, role, password:hashedPassword, status };
        }
        else{
            userUpdatedData = { username, email, role, status };
        }
        
       
     const updatedUser=   await DashboardUser.findByIdAndUpdate(userId, userUpdatedData, { new: true });

        return res.status(200).json({ message: 'User updated successfully', data:updatedUser });
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async(req,res,next) => {
    const userId = req.params.userId;
    try {
        const user = await DashboardUser.findById(userId);

        if (!user) {
            throw new CustomError.NotFoundError('User not found');
        }

        const deletedUser = await DashboardUser.findByIdAndDelete(userId);
        return res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
    } catch (error) {
        next(error)
    }
}
