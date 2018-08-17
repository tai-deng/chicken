import * as $protobuf from "protobufjs";
/** Properties of a QuestionsMeta. */
export interface IQuestionsMeta {

    /** QuestionsMeta id */
    id?: (number|null);

    /** QuestionsMeta difficulty */
    difficulty?: (number|null);

    /** QuestionsMeta question */
    question?: (string|null);

    /** QuestionsMeta answer */
    answer?: (boolean|null);
}

/** Represents a QuestionsMeta. */
export class QuestionsMeta implements IQuestionsMeta {

    /**
     * Constructs a new QuestionsMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IQuestionsMeta);

    /** QuestionsMeta id. */
    public id: number;

    /** QuestionsMeta difficulty. */
    public difficulty: number;

    /** QuestionsMeta question. */
    public question: string;

    /** QuestionsMeta answer. */
    public answer: boolean;

    /**
     * Creates a new QuestionsMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns QuestionsMeta instance
     */
    public static create(properties?: IQuestionsMeta): QuestionsMeta;

    /**
     * Encodes the specified QuestionsMeta message. Does not implicitly {@link QuestionsMeta.verify|verify} messages.
     * @param message QuestionsMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IQuestionsMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified QuestionsMeta message, length delimited. Does not implicitly {@link QuestionsMeta.verify|verify} messages.
     * @param message QuestionsMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IQuestionsMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a QuestionsMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns QuestionsMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): QuestionsMeta;

    /**
     * Decodes a QuestionsMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns QuestionsMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): QuestionsMeta;

    /**
     * Verifies a QuestionsMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a QuestionsMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns QuestionsMeta
     */
    public static fromObject(object: { [k: string]: any }): QuestionsMeta;

    /**
     * Creates a plain object from a QuestionsMeta message. Also converts values to other types if specified.
     * @param message QuestionsMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: QuestionsMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this QuestionsMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GameMeta. */
export interface IGameMeta {

    /** GameMeta questionsMeta */
    questionsMeta?: (IQuestionsMeta[]|null);
}

/** Represents a GameMeta. */
export class GameMeta implements IGameMeta {

    /**
     * Constructs a new GameMeta.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGameMeta);

    /** GameMeta questionsMeta. */
    public questionsMeta: IQuestionsMeta[];

    /**
     * Creates a new GameMeta instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GameMeta instance
     */
    public static create(properties?: IGameMeta): GameMeta;

    /**
     * Encodes the specified GameMeta message. Does not implicitly {@link GameMeta.verify|verify} messages.
     * @param message GameMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGameMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GameMeta message, length delimited. Does not implicitly {@link GameMeta.verify|verify} messages.
     * @param message GameMeta message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGameMeta, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GameMeta message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GameMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GameMeta;

    /**
     * Decodes a GameMeta message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GameMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GameMeta;

    /**
     * Verifies a GameMeta message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GameMeta message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GameMeta
     */
    public static fromObject(object: { [k: string]: any }): GameMeta;

    /**
     * Creates a plain object from a GameMeta message. Also converts values to other types if specified.
     * @param message GameMeta
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GameMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GameMeta to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
