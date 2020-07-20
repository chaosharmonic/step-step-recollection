import Release from '../models/release'

export const getAllReleases = async (req, res, next) => {
  try {
    // TODO: pagination
    // const { pageNo, pageSize } = req.query
    // const query = { pageNo, pageSize }
    const { filters } = req.body

    const releases = await Release.find({ ...filters })

    res.json(releases)
  } catch (err) {
    console.error(err)
  }
}

export const getReleaseById = async (req, res, next) => {
  try {
    const { id } = req.params
    const release = await Release.findOne({ _id: id })

    // TODO: add songs to detailed response

    res.json(release)
  } catch (err) {
    console.error(err)
  }
}

export const addRelease = async (req, res, next) => {
  try {
    const { payload } = req.body
    const existing = await Release.findOne({ title: payload.title })
    if (existing) {
      const message = 'Release already exists!'
      res.json(message)
      return null
    }

    const newRelease = await Release.create({ ...payload })

    res.json(newRelease)
  } catch (err) {
    console.error(err)
  }
}

export const updateRelease = async (req, res, next) => {
  try {
    const { id } = req.params
    const { payload } = req.body
    let updatedRelease = await Release.findOneAndUpdate({ _id: id }, { ...payload })

    updatedRelease = await Release.findOne({ _id: id })

    res.json(updatedRelease)
  } catch (err) {
    console.error(err)
  }
}

export const deleteRelease = async (req, res, next) => {
  try {
    const { id } = req.params
    const isDeleted = await Release.deleteOne({ _id: id })

    if (!isDeleted) throw new Error('Could not delete this id!')

    res.json({
      _id: id
    })
  } catch (err) {
    console.error(err)
  }
}
