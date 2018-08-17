/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "./protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const QuestionsMeta = $root.QuestionsMeta = (() => {

    /**
     * Properties of a QuestionsMeta.
     * @exports IQuestionsMeta
     * @interface IQuestionsMeta
     * @property {number|null} [id] QuestionsMeta id
     * @property {number|null} [difficulty] QuestionsMeta difficulty
     * @property {string|null} [question] QuestionsMeta question
     * @property {boolean|null} [answer] QuestionsMeta answer
     */

    /**
     * Constructs a new QuestionsMeta.
     * @exports QuestionsMeta
     * @classdesc Represents a QuestionsMeta.
     * @implements IQuestionsMeta
     * @constructor
     * @param {IQuestionsMeta=} [properties] Properties to set
     */
    function QuestionsMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * QuestionsMeta id.
     * @member {number} id
     * @memberof QuestionsMeta
     * @instance
     */
    QuestionsMeta.prototype.id = 0;

    /**
     * QuestionsMeta difficulty.
     * @member {number} difficulty
     * @memberof QuestionsMeta
     * @instance
     */
    QuestionsMeta.prototype.difficulty = 0;

    /**
     * QuestionsMeta question.
     * @member {string} question
     * @memberof QuestionsMeta
     * @instance
     */
    QuestionsMeta.prototype.question = "";

    /**
     * QuestionsMeta answer.
     * @member {boolean} answer
     * @memberof QuestionsMeta
     * @instance
     */
    QuestionsMeta.prototype.answer = false;

    /**
     * Creates a new QuestionsMeta instance using the specified properties.
     * @function create
     * @memberof QuestionsMeta
     * @static
     * @param {IQuestionsMeta=} [properties] Properties to set
     * @returns {QuestionsMeta} QuestionsMeta instance
     */
    QuestionsMeta.create = function create(properties) {
        return new QuestionsMeta(properties);
    };

    /**
     * Encodes the specified QuestionsMeta message. Does not implicitly {@link QuestionsMeta.verify|verify} messages.
     * @function encode
     * @memberof QuestionsMeta
     * @static
     * @param {IQuestionsMeta} message QuestionsMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    QuestionsMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
        if (message.difficulty != null && message.hasOwnProperty("difficulty"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.difficulty);
        if (message.question != null && message.hasOwnProperty("question"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.question);
        if (message.answer != null && message.hasOwnProperty("answer"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.answer);
        return writer;
    };

    /**
     * Encodes the specified QuestionsMeta message, length delimited. Does not implicitly {@link QuestionsMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof QuestionsMeta
     * @static
     * @param {IQuestionsMeta} message QuestionsMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    QuestionsMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a QuestionsMeta message from the specified reader or buffer.
     * @function decode
     * @memberof QuestionsMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {QuestionsMeta} QuestionsMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    QuestionsMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.QuestionsMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int32();
                break;
            case 2:
                message.difficulty = reader.int32();
                break;
            case 3:
                message.question = reader.string();
                break;
            case 4:
                message.answer = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a QuestionsMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof QuestionsMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {QuestionsMeta} QuestionsMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    QuestionsMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a QuestionsMeta message.
     * @function verify
     * @memberof QuestionsMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    QuestionsMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.difficulty != null && message.hasOwnProperty("difficulty"))
            if (!$util.isInteger(message.difficulty))
                return "difficulty: integer expected";
        if (message.question != null && message.hasOwnProperty("question"))
            if (!$util.isString(message.question))
                return "question: string expected";
        if (message.answer != null && message.hasOwnProperty("answer"))
            if (typeof message.answer !== "boolean")
                return "answer: boolean expected";
        return null;
    };

    /**
     * Creates a QuestionsMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof QuestionsMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {QuestionsMeta} QuestionsMeta
     */
    QuestionsMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.QuestionsMeta)
            return object;
        let message = new $root.QuestionsMeta();
        if (object.id != null)
            message.id = object.id | 0;
        if (object.difficulty != null)
            message.difficulty = object.difficulty | 0;
        if (object.question != null)
            message.question = String(object.question);
        if (object.answer != null)
            message.answer = Boolean(object.answer);
        return message;
    };

    /**
     * Creates a plain object from a QuestionsMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof QuestionsMeta
     * @static
     * @param {QuestionsMeta} message QuestionsMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    QuestionsMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.id = 0;
            object.difficulty = 0;
            object.question = "";
            object.answer = false;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.difficulty != null && message.hasOwnProperty("difficulty"))
            object.difficulty = message.difficulty;
        if (message.question != null && message.hasOwnProperty("question"))
            object.question = message.question;
        if (message.answer != null && message.hasOwnProperty("answer"))
            object.answer = message.answer;
        return object;
    };

    /**
     * Converts this QuestionsMeta to JSON.
     * @function toJSON
     * @memberof QuestionsMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    QuestionsMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return QuestionsMeta;
})();

export const GameMeta = $root.GameMeta = (() => {

    /**
     * Properties of a GameMeta.
     * @exports IGameMeta
     * @interface IGameMeta
     * @property {Array.<IQuestionsMeta>|null} [questionsMeta] GameMeta questionsMeta
     */

    /**
     * Constructs a new GameMeta.
     * @exports GameMeta
     * @classdesc Represents a GameMeta.
     * @implements IGameMeta
     * @constructor
     * @param {IGameMeta=} [properties] Properties to set
     */
    function GameMeta(properties) {
        this.questionsMeta = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GameMeta questionsMeta.
     * @member {Array.<IQuestionsMeta>} questionsMeta
     * @memberof GameMeta
     * @instance
     */
    GameMeta.prototype.questionsMeta = $util.emptyArray;

    /**
     * Creates a new GameMeta instance using the specified properties.
     * @function create
     * @memberof GameMeta
     * @static
     * @param {IGameMeta=} [properties] Properties to set
     * @returns {GameMeta} GameMeta instance
     */
    GameMeta.create = function create(properties) {
        return new GameMeta(properties);
    };

    /**
     * Encodes the specified GameMeta message. Does not implicitly {@link GameMeta.verify|verify} messages.
     * @function encode
     * @memberof GameMeta
     * @static
     * @param {IGameMeta} message GameMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.questionsMeta != null && message.questionsMeta.length)
            for (let i = 0; i < message.questionsMeta.length; ++i)
                $root.QuestionsMeta.encode(message.questionsMeta[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified GameMeta message, length delimited. Does not implicitly {@link GameMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GameMeta
     * @static
     * @param {IGameMeta} message GameMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GameMeta message from the specified reader or buffer.
     * @function decode
     * @memberof GameMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GameMeta} GameMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.questionsMeta && message.questionsMeta.length))
                    message.questionsMeta = [];
                message.questionsMeta.push($root.QuestionsMeta.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GameMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GameMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GameMeta} GameMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GameMeta message.
     * @function verify
     * @memberof GameMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GameMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.questionsMeta != null && message.hasOwnProperty("questionsMeta")) {
            if (!Array.isArray(message.questionsMeta))
                return "questionsMeta: array expected";
            for (let i = 0; i < message.questionsMeta.length; ++i) {
                let error = $root.QuestionsMeta.verify(message.questionsMeta[i]);
                if (error)
                    return "questionsMeta." + error;
            }
        }
        return null;
    };

    /**
     * Creates a GameMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GameMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GameMeta} GameMeta
     */
    GameMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.GameMeta)
            return object;
        let message = new $root.GameMeta();
        if (object.questionsMeta) {
            if (!Array.isArray(object.questionsMeta))
                throw TypeError(".GameMeta.questionsMeta: array expected");
            message.questionsMeta = [];
            for (let i = 0; i < object.questionsMeta.length; ++i) {
                if (typeof object.questionsMeta[i] !== "object")
                    throw TypeError(".GameMeta.questionsMeta: object expected");
                message.questionsMeta[i] = $root.QuestionsMeta.fromObject(object.questionsMeta[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a GameMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GameMeta
     * @static
     * @param {GameMeta} message GameMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GameMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.questionsMeta = [];
        if (message.questionsMeta && message.questionsMeta.length) {
            object.questionsMeta = [];
            for (let j = 0; j < message.questionsMeta.length; ++j)
                object.questionsMeta[j] = $root.QuestionsMeta.toObject(message.questionsMeta[j], options);
        }
        return object;
    };

    /**
     * Converts this GameMeta to JSON.
     * @function toJSON
     * @memberof GameMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GameMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GameMeta;
})();

export { $root as default };
