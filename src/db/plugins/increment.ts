import mongoose, { Schema, Document, CallbackError } from "mongoose";

interface CounterDocument extends Document {
	model_name: string;
	seq: number;
}

interface AutoIncrementPluginOptions {
	field: string;
	model_name: string;
}

const CounterSchema = mongoose.model(
	"counters",
	new mongoose.Schema<CounterDocument>({
		model_name: {
			type: String,
			required: true,
		},
		seq: {
			type: Number,
			default: 0,
			required: true,
		},
	})
);

const plugin = <T extends Document>(
	schema: Schema<T>,
	options: AutoIncrementPluginOptions
) => {
	const { field, model_name } = options;
	schema.pre("save", async function (next) {
		if (this.isNew) {
			try {
				const Counter = await CounterSchema.findOneAndUpdate(
					{
						model_name,
					},
					{
						$inc: { seq: 1 },
					},
					{
						new: true,
						upsert: true,
					}
				);
				if (Counter) this.set(field, Counter.seq);
			} catch (e) {
				next(e as CallbackError);
			}
		} else {
			next();
		}
	});
};

export default plugin;
