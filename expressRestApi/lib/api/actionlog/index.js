


const postActionlog = async (req, res, next) => {

}

const getActionlogs = async (req, res, next) => {

}

const putActionlog = async (req, res, next) => {

}

const deleteActionlog = async (req, res, next) => {

}


/////////////
/////////////


const serveActionlogApi = (router) => {
    router.post("/actionlog/:actId", postActionlog)
    router.get("/actionlogs", getActionlogs)
    router.put("/actionlog/:actId", putActionlog)
    router.delete("/actionlog/:actId", deleteActionlog)
}

exports.serveActionlogApi = serveActionlogApi