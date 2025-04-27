import jwt from 'jsonwebtoken'

export const generateAccessToken = async(userid)=>{

    try
    {
        const token = jwt.sign({id:userid}, process.env.SECRET_KEY, { expiresIn: '1h' })
        return token

    }

    catch(error)
    {
        console.error('Error generating access token', error)
        return null
    }

    




}