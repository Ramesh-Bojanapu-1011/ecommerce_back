import mongoose from 'mongoose';
/**
 * The function `validate_mongoos_id` checks if a given ID is a valid MongoDB ObjectID and throws an
 * error if it is not valid.
 * @param id - The `id` parameter is a value that is supposed to represent a MongoDB ObjectId.
 */
const mongoose_object_id_validator = (id) => {
  const isvalid = mongoose.Types.ObjectId.isValid(id);
  if (!isvalid) throw new Error('this statement is not valid or not found');
};

export default mongoose_object_id_validator;
