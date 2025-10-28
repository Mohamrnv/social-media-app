import mongoose, { FilterQuery, Model, PopulateOption, ProjectionType, QueryOptions, UpdateQuery } from "mongoose";
export abstract class BaseRepository<T> {

  constructor(private model: Model<T>) { }

  async createOneDocument(document: Partial<T>): Promise<T> {
    return await this.model.create(document);
  }

  async findOneDocuments(filter: FilterQuery<T>, projection?: ProjectionType<T>, populate?: PopulateOption): Promise<T | null> {
    return await this.model.findOne(filter, projection, populate)
  }
  async findDocumentById(id: mongoose.Types.ObjectId, projection?: ProjectionType<T>, populate?: PopulateOption): Promise<T | null> {
    return await this.model.findById(id, projection, populate)
  }
  async updateOneDocument(
    filter: FilterQuery<T>,
    update: mongoose.UpdateWithAggregationPipeline | mongoose.UpdateQuery<T>,
    options?: mongoose.QueryOptions
  ) {
    return await this.model.findOneAndUpdate(filter, update, { new: true, ...options });
  }


  deleteOneDocument() { }
  deleteMultipleDocument() { }
  async findAndUpdateDocument(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions = { new: true }
  ): Promise<T | null> {
    try {
      const updatedDoc = await this.model.findOneAndUpdate(filter, update, {
        new: true,
        ...options, 
      });
      return updatedDoc;
    } catch (error) {
      console.error("Error in findAndUpdateDocument:", error);
      throw error;
    }
  }
}

