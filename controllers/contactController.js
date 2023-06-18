const asyncHandler = require("express-async-handler");
const Contact=require("../models/contactModel");
//@desc Get all contacts
//@rout GET /api/contacts
//@access public

const getContacts =asyncHandler(async(req,res)=>{
  const contact=await Contact.find();
    res.status(200).json(contact)
});

//@desc Create all contacts
//@rout POST /api/contacts
//@access public
   
const createContact=asyncHandler(async(req,res)=>{
    console.log("the body req is",JSON.stringify(req.body));
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
      // res.sendStatus(400)
      throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
      name,
      email,
      phone,
    })
    res.status(201).json(contact)
}
)
//@desc Get all contacts
//@rout GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
     res.status(404);
     throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Update contacts
//@rout PUT /api/contacts/:id
//@access public

const updateContact= asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
     res.status(404);
     throw new Error("Contact not found");
  }
  const updatedContact=await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  )
    res.status(201).json(updatedContact);
  })

//@desc Delete contacts
//@rout DELETE /api/contact/:id
//@access public 
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const deletedContact = await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json( deletedContact );
});


module.exports={getContacts,createContact,getContact,updateContact,deleteContact};
