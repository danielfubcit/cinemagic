import {Save, Read} from '@/utils/helpers';

export default async function handler(req, res) {
    const {uuid} = req.query;
    try{
        const json = await import(`@/saves/${uuid}.json`)
        console.log(json);
        res.status(200).json(json.default);
    }catch (e){    
        res.status(200).json(false)
  }
}