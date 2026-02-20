"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class StorageService {
    constructor(fileName) {
        const dataDir = path.join(__dirname, '../../data');
        // Create data directory if it doesn't exist
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        this.filePath = path.join(dataDir, fileName);
        this.data = new Map();
        this.loadFromFile();
    }
    loadFromFile() {
        try {
            if (fs.existsSync(this.filePath)) {
                const fileContent = fs.readFileSync(this.filePath, 'utf-8');
                const parsedData = JSON.parse(fileContent);
                this.data = new Map(Object.entries(parsedData));
            }
        }
        catch (error) {
            console.error('Error loading data from file:', error);
            this.data = new Map();
        }
    }
    saveToFile() {
        try {
            const dataObject = Object.fromEntries(this.data);
            fs.writeFileSync(this.filePath, JSON.stringify(dataObject, null, 2), 'utf-8');
        }
        catch (error) {
            console.error('Error saving data to file:', error);
            throw new Error('Failed to save data');
        }
    }
    create(id, item) {
        this.data.set(id, item);
        this.saveToFile();
        return item;
    }
    findAll() {
        return Array.from(this.data.values());
    }
    findById(id) {
        return this.data.get(id);
    }
    update(id, item) {
        if (!this.data.has(id)) {
            return undefined;
        }
        this.data.set(id, item);
        this.saveToFile();
        return item;
    }
    delete(id) {
        const result = this.data.delete(id);
        if (result) {
            this.saveToFile();
        }
        return result;
    }
    exists(id) {
        return this.data.has(id);
    }
}
exports.StorageService = StorageService;
