const ClientModel = require("../model/clientModel")

module.exports = {
    createClient: async (req, res) => {
        console.log("reqbody", req.body)

        try {
            const data = req.body
            if (!data.name) throw new Error("Name is required")
            if (!data.lastName) throw new Error("lastname is required")
            if (!data.email) throw new Error("email is required")
            if (!data.project) throw new Error("project is required")
            if (!data.phoneNumber) throw new Error("Mobile Number is required")

            await ClientModel.create(data)
            res.status(200).send({ status: 200, message: "Client created successfully", data: [] })

        } catch (error) {
            res.status(400).send({ status: 400, message: error.message })
        }
    },
    getClients: async (req, res) => {
        console.log("reqbody", req.body)

        try {
            const clients = await ClientModel.find({})
            res.status(200).send({ status: 200, message: "Clients fetched successfully", clients })

        } catch (error) {
            res.status(400).send({ status: 400, message: error.message })
        }
    },
    removeClients: async (req, res) => {
        try {
            const result  = await ClientModel.findByIdAndDelete({_id: req.params.id})
              res.status(200).send({
                success:true,
                message:`${result.name} Delete successfully`
              })
            
          } catch (error) {
            console.log(error)
            res.status(500).send({
              success:false,
              message:"Something went wrong",
              error
            })
          }
    },
    
  
}
