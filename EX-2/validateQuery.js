const validateQuery = (req, res, next) => {
    const { minCredits, maxCredits } = req.query;

    const min = parseInt(minCredits);
    const max = parseInt(maxCredits);
    
    // Check for invalid integers
    if((minCredits && isNaN(min)) || (maxCredits && isNaN(max))) {
        return res.status(400).json({error: `minCredits and maxCredits must be integers`});
    }

    //  Check logical range
    if(!isNaN(min) && !isNaN(max) && min > max) {
        return res.status(400).jsom({error: `minCredits must not be greater than maxCredits`});
    }

    next();
}

export default validateQuery;