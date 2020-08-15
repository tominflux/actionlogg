

const postArchetype = async (req, res, next) => {

}

const getArchetypes = async (req, res, next) => {

}

const getArchetype = async (req, res, next) => {

}

const deleteArchetype = async (req, res, next) => {
    
}


/////////////
/////////////


const serveArchetypeApi = (router) => {
    router.post("/actionlog/:actId/archetype/:arcId", postArchetype)
    router.get("/actionlog/:actId/archetypes", getArchetypes)
    router.get("/actionlog/:actId/archetype/:arcId", getArchetype)
    //router.put("/actionlog/:actId/archetype/:arcId", putArchetype)
    router.delete("/actionlog/:actId/archetype/:arcId", deleteArchetype)
}

exports.serveArchetypeApi = serveArchetypeApi