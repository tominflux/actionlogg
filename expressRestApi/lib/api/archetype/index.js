

const postArchetype = async (req, res, next) => {
    //
    const actionlogId = req.params.actId
    const archetypeId = req.param.arcId
    //
    const archetypeProps = req.body.properties
    //
    await req.actionlogg.createArchetype(
        actionlogId,
        archetypeId,
        archetypeProps
    )
    //
    res.send()
}

const getArchetypes = async (req, res, next) => {
    //
    const actionlogId = req.params.actId
    //
    const archetypes = await req.actionlogg.readArchetypes(actionlogId)
    //
    res.json(archetypes)
}

const getArchetype = async (req, res, next) => {
    //
    const actionlogId = req.params.actId
    const archetypeId = req.param.arcId
    //
    const archetype = await req.actionlogg.readArchetype(
        actionlogId, 
        archetypeId
    )
    //
    res.json(archetype)
}

const deleteArchetype = async (req, res, next) => {
    //
    const actionlogId = req.params.actId
    const archetypeId = req.param.arcId
    //
    await req.actionlogg.deleteArchetype(
        actionlogId, 
        archetypeId
    )
    //
    res.send()
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