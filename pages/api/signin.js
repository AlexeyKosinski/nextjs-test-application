// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  if (req.method === 'POST') {
    const {username,password} = req.body
    if(username==='u' && password==='p'){
      res.status(200).json({ name: 'John', lastName:'007', jwt:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
    }else {
      res.status(422).send({ error: 'Invalid username or password' })
    }

  }

}
