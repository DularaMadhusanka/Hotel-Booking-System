//get/api/user

export const getUserData =async (req,res)=>{
    try{
       const role = req.user.role;
       const recentSearchedCities = req.user.recentSearchedCities;
       res.json({success : true,role,recentSearchedCities})
    }catch(error){
        res.json({sucess : false, message : error.message})

    }
}