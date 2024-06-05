"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bd_1 = __importDefault(require("../../bd/bd"));
class RacesController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(bd_1.default.instance.getBdData());
                res.status(200).json(bd_1.default.instance.getBdData());
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
}
exports.default = RacesController;
const carreirasMock = [
    {
        fecha: "15/07/2023",
        nombre: "CARREIRA SOLIDARIA MÓVETE POLA DIABETES",
        url: "http://carreirasgalegas.com/carreira/ii-carreira-solidaria-m-vete-pola-diabetes/31f1acf7-dac3-63d0-4789-3a0b32399bd1",
        localidad: "A Pobra do Caramiñal"
    },
    {
        fecha: "11/06/2023",
        nombre: "XV SUBIDA ROCAS - O EIRADO - CAMPIONATO XUNTA DE GALICIA TRAIL RUNNING SUBESPECIALIDADE CARREIRAS DE MONTAÑA",
        url: "http://carreirasgalegas.com/carreira/xv-subida-rocas-o-eirado-campionato-xunta-de-galicia-trail-running-subespecialidade-carreiras-de-montaña/807f97f7-b58e-1d83-0e4f-3a0b40733ff3",
        localidad: "Esgos"
    },
    {
        fecha: "29/10/2023",
        nombre: "XLIV CARREIRA PEDESTRE POPULAR DE SANTIAGO - EL CORREO GALLEGO",
        url: "http://carreirasgalegas.com/carreira/xliv-carreira-pedestre-popular-de-santiago-el-correo-gallego/478374a0-e88d-7f26-cab0-3a0b369a6e99",
        localidad: "Santiago de Compostela"
    },
    {
        fecha: "24/09/2023",
        nombre: "I CARREIRA SOLIDARIA AS PONTES CONTIGO",
        url: "http://carreirasgalegas.com/carreira/i-carreira-solidaria-as-pontes-contigo/b79fae7b-ac5b-8050-51c5-3a0b651414fc",
        localidad: "As Pontes"
    },
    {
        fecha: "09/07/2023",
        nombre: "II MEDIA MARATÓN E 10QM CAMIÑO INGLÉS - RED STELAR",
        url: "http://carreirasgalegas.com/carreira/ii-media-marat-n-e-10qm-camiño-ingl-s-red-stelar/179977fb-0939-70ce-e714-3a08c757fde6",
        localidad: "Oroso"
    },
    {
        fecha: "13/08/2023",
        nombre: "XII NIGRÁN AREA 2023",
        url: "http://carreirasgalegas.com/carreira/xii-nigr-n-area-2023/8df04d7b-ae60-3b04-4e1a-3a0b83bdcbc1",
        localidad: "Nigrán"
    },
    {
        fecha: "02/07/2023",
        nombre: "10K PORTO DE FERROL",
        url: "http://carreirasgalegas.com/carreira/10k-porto-de-ferrol/cfbf55ba-f255-af42-48c5-3a0b8c463151",
        localidad: "Ferrol"
    },
    {
        fecha: "17/09/2023",
        nombre: "XXXI MILLA URBANA FESTAS DO CRISTO",
        url: "http://carreirasgalegas.com/carreira/xxxi-milla-urbana-festas-do-cristo/bd9a614f-7f70-551a-cb28-3a098378f78b",
        localidad: "O Barco de Valdeorras"
    }
];
