const { default: slugify } = require("slugify");
const categoryModel = require("../models/categoryModel");


const createCategoryController = async(req,res,next)=>{
    try {
        const{name} = req.body;
        if(!name){
            return res.status(400).json({success:false,message:"category name is required"})
        }
        const existingName = await categoryModel.findOne({name})
        if(existingName){
            return res.status(400).json({success:false,message:"category name alredy  existingName"})
        }
        const category = await new categoryModel({
            name,
            slug:slugify(name)
        })
        await category.save()
        return res.status(200).json({success:true,message:"category created sucessfully",category})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server Error"})
    }
}

const updateCategoryController = async(req,res,next)=>{
try {
    const{name} = req.body;
    const {id}  = req.params;
    const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
    return res.status(200).json({success:true,message:"category updated sucessfully",category})
    
} catch (error) {
    console.log(error)
    return res.status(500).json({success:false,message:"Internal server Error"})
}
}

const getAllCategory =async(req,res,next)=>{
    try {
        const categorys = await categoryModel.find({});
         res.status(200).send({  success: true,message:"Successfully get All category",categorys})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server Error"})
    }
}

// single category
const Singlecategory =async(req,res,next)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        return res.status(200).json({success:true,message:"Successfully get single category",category})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server Error"})
    }
}

const deleteCategory = async(req,res,next)=>{
  try {
    const {id} = req.params;
     await categoryModel.findByIdAndDelete(id);
    return res.status(200).json({success:true,message:"Deleted Succesfully"})
    
  } catch (error) {
     console.log(error)
     return res.status(500).json({success:false,message:"Internal server Error"})
  }
}




module.exports = {
    createCategoryController,
    updateCategoryController,
    getAllCategory,
    Singlecategory,
    deleteCategory,

}