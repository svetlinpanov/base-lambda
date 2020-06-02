import { ModelSchema, SampleModel } from "./schema";
import { Connection } from "./connection";

export class Storage {
    private dbConnection: Connection;
    constructor() {
        this.dbConnection = new Connection();
        this.dbConnection.connectToDB();
    }
    public async getByFilter(filterProperty: string, filterValue: string): Promise<SampleModel | null> {
        try {
            const filter: any = {};
            filter[filterProperty] = { $in: [filterValue] };
            return ModelSchema.findOne(filter).exec();
        } catch (error) {
            const errorMsg = `Cannot obtain model ${filterValue}. Error: ${error}`;
            return  Promise.reject(new Error(errorMsg));
        }
    }

    public async create(model: SampleModel): Promise<SampleModel | undefined> {
        try {
            if(!this.dbConnection.checkConnection) {
                this.dbConnection.connectToDB();
            }
            const newModel = new ModelSchema(model);
            const modelSaved = newModel.save();
            return modelSaved;
        } catch (error) {
          Promise.reject(error);
        } finally {
            this.dbConnection.disconnect();
        }
    }

    public async getByID(id: string): Promise<SampleModel | null> {
        return this.getByFilter("id", id);
    }

    public async getAll(): Promise<SampleModel[]> {
    
        try {
          const tmpres = await ModelSchema.find({}).exec();
          return Promise.resolve(tmpres);
        } catch (error) {
          const errorMsg = `Error: ${error}`;
          return Promise.reject(new Error(errorMsg));
        }
      }
    
      public async deleteAll(): Promise<void> {
        try {
          await ModelSchema.deleteMany({}).exec();
        } catch (err) {
          throw new Error(
            "couldn't remove all models from model storage: " + JSON.stringify(err)
          );
        }
      }
}