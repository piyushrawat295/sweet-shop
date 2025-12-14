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
exports.purchase = exports.remove = exports.update = exports.search = exports.list = exports.create = void 0;
const s = __importStar(require("./sweets.service"));
const create = async (req, res) => res.json(await s.createSweet(req.body));
exports.create = create;
const list = async (_, res) => res.json(await s.getAll());
exports.list = list;
const search = async (req, res) => res.json(await s.search(req.query));
exports.search = search;
const update = async (req, res) => res.json(await s.updateSweet(+req.params.id, req.body));
exports.update = update;
const remove = async (req, res) => res.json(await s.deleteSweet(+req.params.id));
exports.remove = remove;
/* =========================
   ✅ PURCHASE SWEET (NEW)
   ========================= */
const purchase = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updatedSweet = await s.purchaseSweet(id);
        res.json(updatedSweet);
    }
    catch (err) {
        res.status(400).json({
            message: err.message || "Purchase failed"
        });
    }
};
exports.purchase = purchase;
