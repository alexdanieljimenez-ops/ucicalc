import { useState, useMemo } from "react";

const ACCENT = "#0891B2";
const ACCENT_LIGHT = "#E0F2FE";
const ACCENT_MID = "#0E7490";

const T = {
  bg:"#F2F2F7", surface:"#FFFFFF", surface2:"#F2F2F7", card:"#FFFFFF",
  border:"#E5E5EA", label:"#8E8E93", text:"#1C1C1E", sub:"#3C3C43",
  accent:ACCENT, green:"#34C759", yellow:"#FF9500", red:"#FF3B30",
};

const SEM = {
  green:  { bg:"#F0FBF3", border:"#34C75930", dot:"#34C759", txt:"#1A8C3A", badge:"#E8F8EC", badgeTxt:"#1A8C3A", label:"Normal" },
  yellow: { bg:"#FFF8F0", border:"#FF950030", dot:"#FF9500", txt:"#CC7A00", badge:"#FFF0DB", badgeTxt:"#CC7A00", label:"Límite" },
  red:    { bg:"#FFF0EF", border:"#FF3B3030", dot:"#FF3B30", txt:"#CC2F26", badge:"#FFE8E7", badgeTxt:"#CC2F26", label:"Alterado" },
  gray:   { bg:"#FAFAFA",  border:"#E5E5EA",  dot:"#C7C7CC", txt:"#8E8E93", badge:"#F2F2F7", badgeTxt:"#8E8E93", label:"—" },
};

const r = (v,d=1) => (v===null||v===undefined||isNaN(v)?null:+parseFloat(v).toFixed(d));
const n = v => (v===""||v===null||v===undefined?null:parseFloat(v));

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
function Inp({ label, unit, value, onChange, hint, placeholder="—" }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{marginBottom:2}}>
      <div style={{fontSize:11,fontWeight:600,color:T.label,letterSpacing:"0.02em",marginBottom:4,textTransform:"uppercase"}}>{label}</div>
      <div style={{display:"flex",alignItems:"center",background:T.surface,border:`1.5px solid ${focused?ACCENT:T.border}`,borderRadius:10,padding:"10px 14px",transition:"all 0.15s",boxShadow:focused?`0 0 0 3px ${ACCENT}18`:"none"}}>
        <input type="number" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          style={{background:"transparent",color:T.text,fontSize:15,width:"100%",outline:"none",border:"none",fontWeight:"500",MozAppearance:"textfield"}} />
        {unit&&<span style={{fontSize:13,color:T.label,marginLeft:4,whiteSpace:"nowrap"}}>{unit}</span>}
      </div>
      {hint&&<div style={{fontSize:11,color:T.label,marginTop:3,paddingLeft:2}}>{hint}</div>}
    </div>
  );
}

function Sel({ label, value, onChange, options }) {
  return (
    <div style={{marginBottom:2}}>
      <div style={{fontSize:11,fontWeight:600,color:T.label,letterSpacing:"0.02em",marginBottom:4,textTransform:"uppercase"}}>{label}</div>
      <select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",background:T.surface,color:T.text,border:`1.5px solid ${T.border}`,borderRadius:10,padding:"10px 14px",fontSize:15,outline:"none",fontWeight:"500",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238E8E93' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 14px center"}}>
        {options.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  );
}

function Row({ label, value, unit, color="gray", normal, noStatus }) {
  const s = SEM[color];
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",background:s.bg,borderRadius:10,border:`1px solid ${s.border}`,marginBottom:6}}>
      <div style={{display:"flex",alignItems:"center",gap:10,flex:1,minWidth:0}}>
        {!noStatus&&<div style={{width:8,height:8,borderRadius:"50%",background:s.dot,flexShrink:0}}/>}
        <div style={{minWidth:0}}>
          <div style={{fontSize:13,fontWeight:500,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{label}</div>
          {normal&&<div style={{fontSize:11,color:T.label,marginTop:1}}>{normal}</div>}
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginLeft:8,flexShrink:0}}>
        {!noStatus&&value!==null&&<span style={{fontSize:11,fontWeight:600,color:s.badgeTxt,background:s.badge,padding:"2px 8px",borderRadius:20,whiteSpace:"nowrap"}}>{s.label}</span>}
        <span style={{fontSize:15,fontWeight:600,color:T.text,whiteSpace:"nowrap"}}>
          {value!==null&&value!==undefined?<>{value}{unit&&<span style={{fontSize:12,color:T.label,marginLeft:3}}>{unit}</span>}</>:<span style={{color:T.label}}>—</span>}
        </span>
      </div>
    </div>
  );
}

function Card({ children, title, icon }) {
  return (
    <div style={{background:T.card,borderRadius:16,overflow:"hidden",marginBottom:14,boxShadow:"0 1px 3px rgba(0,0,0,0.07),0 1px 2px rgba(0,0,0,0.04)"}}>
      {title&&(
        <div style={{padding:"14px 16px 10px",display:"flex",alignItems:"center",gap:8,borderBottom:`1px solid ${T.border}`}}>
          {icon&&<span style={{fontSize:17}}>{icon}</span>}
          <span style={{fontSize:13,fontWeight:700,color:ACCENT,letterSpacing:"0.01em"}}>{title}</span>
        </div>
      )}
      <div style={{padding:16}}>{children}</div>
    </div>
  );
}

function SL({ text }) {
  return <div style={{fontSize:12,fontWeight:600,color:T.label,letterSpacing:"0.04em",textTransform:"uppercase",padding:"4px 4px 8px"}}>{text}</div>;
}

function G2({ children }) {
  return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{children}</div>;
}

function BM({ label, value, unit, color }) {
  const col = color||ACCENT;
  return (
    <div style={{background:T.surface2,borderRadius:12,padding:"14px 12px",textAlign:"center"}}>
      <div style={{fontSize:11,fontWeight:600,color:T.label,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.03em"}}>{label}</div>
      <div style={{fontSize:22,fontWeight:700,color:col,lineHeight:1}}>{value||"—"}</div>
      {unit&&<div style={{fontSize:11,color:T.label,marginTop:3}}>{unit}</div>}
    </div>
  );
}

function VT({ value, onChange }) {
  return (
    <div style={{display:"flex",background:"#E5E5EA",borderRadius:10,padding:3,gap:2}}>
      {[{v:"datos",l:"📋  Datos"},{v:"resultados",l:"📊  Resultados"}].map(o=>(
        <button key={o.v} onClick={()=>onChange(o.v)} style={{flex:1,padding:"7px 0",borderRadius:8,fontSize:13,fontWeight:600,border:"none",cursor:"pointer",transition:"all 0.18s",background:value===o.v?T.surface:"transparent",color:value===o.v?T.text:T.label,boxShadow:value===o.v?"0 1px 4px rgba(0,0,0,0.13)":"none"}}>
          {o.l}
        </button>
      ))}
    </div>
  );
}

function Alrt({ color, icon, title, body }) {
  const c = {red:{bg:"#FFF0EF",border:"#FF3B3040",title:"#CC2F26",body:"#6B6B6B"},yellow:{bg:"#FFF8F0",border:"#FF950040",title:"#CC7A00",body:"#6B6B6B"},green:{bg:"#F0FBF3",border:"#34C75940",title:"#1A8C3A",body:"#6B6B6B"}}[color]||{bg:"#F2F2F7",border:"#E5E5EA",title:T.label,body:T.label};
  return (
    <div style={{padding:"12px 14px",borderRadius:12,background:c.bg,border:`1px solid ${c.border}`,marginBottom:8}}>
      <div style={{fontSize:13,fontWeight:600,color:c.title,marginBottom:body?3:0}}>{icon} {title}</div>
      {body&&<div style={{fontSize:12,color:c.body,lineHeight:1.5}}>{body}</div>}
    </div>
  );
}

function IBox({ text }) {
  return <div style={{padding:"9px 12px",background:ACCENT_LIGHT,borderRadius:10,fontSize:12,color:ACCENT_MID,marginTop:6}}>{text}</div>;
}

function Div() { return <div style={{height:1,background:T.border,margin:"12px 0"}} />; }

// ─── CALCS ────────────────────────────────────────────────────────────────────
function useCalcs(v) {
  return useMemo(()=>{
    const fc=n(v.fc),pas=n(v.pas),pad=n(v.pad),spo2=n(v.spo2),fio2=n(v.fio2_basic)||21;
    const alt=n(v.altura),peso=n(v.peso);
    const hb=n(v.hb),sao2=n(v.sao2)||spo2,pao2=n(v.pao2);
    const svo2=n(v.svo2),pvco2=n(v.pvco2),pvo2=n(v.pvo2),paco2=n(v.paco2);
    const lac1=n(v.lactato1),lac2=n(v.lactato2);
    const dtsvi=n(v.dtsvi),vti=n(v.vti),epss=n(v.epss);
    const fac_dd=n(v.fac_dd),fac_ds=n(v.fac_ds);
    const cfa_fd=n(v.cfa_fd),cfa_fs=n(v.cfa_fs);

    const PAM=pas&&pad?r((pas+2*pad)/3,1):null;
    const PP=pas&&pad?r(pas-pad,0):null;
    const iShock=fc&&pas?r(fc/pas,2):null;
    const SaFi=spo2?r(spo2/(fio2/100),0):null;
    const BSA=alt&&peso?r(Math.sqrt(alt*peso/3600),2):null;
    const ATSVI_eco=dtsvi?r((dtsvi**2)*0.785,2):null;
    const DTSVI_est=BSA?r(5.7*BSA+12.1,1):null;
    const ATSVI_est=DTSVI_est?r(((DTSVI_est/10)**2)*0.785,2):null;
    const ATSVI=ATSVI_eco||ATSVI_est;
    const atsvi_method=ATSVI_eco?"medido":ATSVI_est?"estimado":null;
    const GC=vti&&ATSVI&&fc?r(vti*ATSVI*fc/1000,2):null;
    const IC=GC&&BSA?r(GC/BSA,2):null;
    const FEVI_epss=epss!==null?r(Math.max(0,Math.min(100,75.5-2.5*epss)),1):null;
    const FEVI_simp=n(v.fevi_simpson);
    const FAC=fac_dd&&fac_ds?r((fac_dd-fac_ds)/fac_dd*100,1):null;
    const CFA=cfa_fd&&cfa_fs?r((cfa_fd-cfa_fs)/cfa_fd*100,1):null;

    // VCI
    const vci_max=n(v.vci_max),vci_min=n(v.vci_min),vci_modo=v.vci_modo||"espontaneo";
    const IC_VCI=vci_max&&vci_min?r((vci_max-vci_min)/vci_max*100,1):null;
    const ID_VCI=vci_max&&vci_min?r((vci_max-vci_min)/vci_min*100,1):null;
    const DELTA_VCI=vci_max&&vci_min?r(vci_max-vci_min,1):null;
    let PVC_est=null,pvc_est_label=null;
    if(vci_modo==="espontaneo"&&vci_max!==null&&IC_VCI!==null){
      const grande=vci_max>21,colapsa=IC_VCI>50;
      if(!grande&&colapsa){PVC_est=3;pvc_est_label="Baja (0–5)";}
      else if(grande&&!colapsa){PVC_est=15;pvc_est_label="Alta (10–20)";}
      else{PVC_est=8;pvc_est_label="Intermedia (5–10)";}
    }
    const pvc_efectiva=n(v.pvc)??PVC_est??0;
    const pvc_fuente=n(v.pvc)!==null?"directa":PVC_est!==null?"estimada VCI":"asumida 0";

    const CaO2=hb&&sao2?r(hb*1.36*(sao2/100)+(pao2||0)*0.0031,2):null;
    const CvO2=hb&&svo2?r(hb*1.36*(svo2/100)+(pvo2||0)*0.0031,2):null;
    const DifCaV=CaO2&&CvO2?r(CaO2-CvO2,2):null;
    const DO2I=IC&&CaO2?r(IC*CaO2*10,0):null;
    const VO2I=IC&&DifCaV?r(IC*DifCaV*10,0):null;
    const O2ER=CaO2&&CvO2?r((CaO2-CvO2)/CaO2*100,1):null;
    const DeltaCO2=pvco2&&paco2?r(pvco2-paco2,1):null;
    const DepLac=lac1&&lac2?r((lac1-lac2)/lac1*100,1):null;
    const RVS=PAM&&GC?r((PAM-pvc_efectiva)*79.92/GC,1):null;
    const CPO=PAM&&GC?r(PAM*GC/451,2):null;
    return {PAM,PP,iShock,SaFi,BSA,ATSVI,ATSVI_eco,ATSVI_est,DTSVI_est,atsvi_method,GC,IC,FEVI_epss,FEVI_simp,FAC,CFA,CaO2,CvO2,DifCaV,DO2I,VO2I,O2ER,DeltaCO2,DepLac,RVS,CPO,IC_VCI,ID_VCI,DELTA_VCI,PVC_est,pvc_est_label,pvc_efectiva,pvc_fuente,vci_max,vci_min,vci_modo};
  },[v]);
}

// ─── HEMO ─────────────────────────────────────────────────────────────────────
function HemoInputs({ v, set }) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
      {/* COL 1 */}
      <div>
        <SL text="Signos Vitales" />
        <Card>
          <G2>
            <Inp label="FC" unit="lpm" value={v.fc} onChange={set("fc")} />
            <Inp label="SpO₂" unit="%" value={v.spo2} onChange={set("spo2")} />
            <Inp label="PAS" unit="mmHg" value={v.pas} onChange={set("pas")} />
            <Inp label="PAD" unit="mmHg" value={v.pad} onChange={set("pad")} />
            <Inp label="FiO₂" unit="%" value={v.fio2_basic} onChange={set("fio2_basic")} hint="Aire ambiental = 21%" />
          </G2>
        </Card>
        <SL text="Antropometría" />
        <Card><G2>
          <Inp label="Talla" unit="cm" value={v.altura} onChange={set("altura")} />
          <Inp label="Peso" unit="kg" value={v.peso} onChange={set("peso")} />
        </G2></Card>
        <SL text="Gasometría Arterial" />
        <Card><G2>
          <Inp label="PaO₂" unit="mmHg" value={v.pao2} onChange={set("pao2")} />
          <Inp label="PaCO₂" unit="mmHg" value={v.paco2} onChange={set("paco2")} />
          <Inp label="SaO₂" unit="%" value={v.sao2} onChange={set("sao2")} hint="Si difiere de SpO₂" />
          <Inp label="HCO₃" unit="mEq/L" value={v.hco3a} onChange={set("hco3a")} />
        </G2></Card>
        <SL text="Gasometría Venosa" />
        <Card><G2>
          <Inp label="SvO₂ / ScvO₂" unit="%" value={v.svo2} onChange={set("svo2")} hint="VN >65% / >70%" />
          <Inp label="PvCO₂" unit="mmHg" value={v.pvco2} onChange={set("pvco2")} />
          <Inp label="PvO₂" unit="mmHg" value={v.pvo2} onChange={set("pvo2")} />
        </G2></Card>
        <SL text="Labs y CVC" />
        <Card><G2>
          <Inp label="Hb" unit="g/dL" value={v.hb} onChange={set("hb")} />
          <Inp label="PVC directa" unit="mmHg" value={v.pvc} onChange={set("pvc")} hint="Si no hay, se estima por VCI" />
          <Inp label="Lactato inicial" unit="mmol/L" value={v.lactato1} onChange={set("lactato1")} />
          <Inp label="Lactato 2h" unit="mmol/L" value={v.lactato2} onChange={set("lactato2")} />
        </G2></Card>
      </div>

      {/* COL 2 */}
      <div>
        <SL text="ECO — VTI y Gasto Cardíaco" />
        <Card>
          <G2>
            <Inp label="D TSVI" unit="cm" value={v.dtsvi} onChange={set("dtsvi")} hint="ATSVI = D²×0.785" />
            <Inp label="VTI TSVI" unit="cm" value={v.vti} onChange={set("vti")} hint="Normal 18–22 cm" />
          </G2>
          <IBox text="Sin D TSVI → se estima por 5.7×SC+12.1 (J Am Soc Echocardiogr 2009)" />
        </Card>

        <SL text="ECO — Función Sistólica VI" />
        <Card>
          <G2>
            <Inp label="E/Septum (EPSS)" unit="mm" value={v.epss} onChange={set("epss")} hint="VN <7 mm" />
            <Inp label="FEVI Simpson's" unit="%" value={v.fevi_simpson} onChange={set("fevi_simpson")} hint="Del ecógrafo" />
          </G2>
          <Div />
          <div style={{fontSize:12,fontWeight:600,color:T.label,marginBottom:8}}>FAC — Fracción de Acortamiento (Modo M)</div>
          <G2>
            <Inp label="DFDVI" unit="mm" value={v.fac_dd} onChange={set("fac_dd")} hint="VN <60 mm" />
            <Inp label="DFSVI" unit="mm" value={v.fac_ds} onChange={set("fac_ds")} />
          </G2>
          <Div />
          <div style={{fontSize:12,fontWeight:600,color:T.label,marginBottom:8}}>CFA — Cambio Fraccional de Área (Apical 4C)</div>
          <G2>
            <Inp label="Área FD VI" unit="cm²" value={v.cfa_fd} onChange={set("cfa_fd")} hint="Trazado FD" />
            <Inp label="Área FS VI" unit="cm²" value={v.cfa_fs} onChange={set("cfa_fs")} hint="Trazado FS" />
          </G2>
        </Card>

        <SL text="ECO — VD" />
        <Card><G2>
          <Inp label="MAPSE lateral" unit="mm" value={v.mapse} onChange={set("mapse")} hint="VN >16 mm" />
          <Inp label="TAPSE" unit="mm" value={v.tapse} onChange={set("tapse")} hint="VN >17 mm" />
          <Inp label="Relación VD/VI" value={v.rvlv} onChange={set("rvlv")} hint="VN <0.6" />
        </G2></Card>

        <SL text="VCI — Precarga y PVC estimada" />
        <Card>
          <Sel label="Modo respiratorio" value={v.vci_modo} onChange={set("vci_modo")} options={[
            {v:"espontaneo",l:"🫁 Respiración espontánea"},
            {v:"vm_invasiva",l:"⚙️ VM invasiva (presión positiva)"},
            {v:"vni",l:"😷 VNI / CPAP"},
          ]} />
          <Div />
          <G2>
            <Inp label="VCI máximo (espiración)" unit="mm" value={v.vci_max} onChange={set("vci_max")} hint={v.vci_modo==="vm_invasiva"?"Inspiración en VM":"En espiración"} />
            <Inp label="VCI mínimo (inspiración)" unit="mm" value={v.vci_min} onChange={set("vci_min")} hint={v.vci_modo==="vm_invasiva"?"Espiración en VM":"Con sniff"} />
          </G2>
          {v.vci_modo==="vm_invasiva"&&<div style={{marginTop:10,padding:"9px 12px",background:"#FFF8F0",border:"1px solid #FF950040",borderRadius:10,fontSize:12,color:"#CC7A00"}}>⚠️ VM invasiva: Tabla ASE de PVC no válida — usar línea central</div>}
          {v.vci_modo==="vni"&&<div style={{marginTop:10,padding:"9px 12px",background:"#FFF8F0",border:"1px solid #FF950040",borderRadius:10,fontSize:12,color:"#CC7A00"}}>⚠️ VNI/CPAP: comportamiento mixto — interpretar con cautela</div>}
        </Card>
      </div>
    </div>
  );
}

function HemoResults({ c, v }) {
  const {PAM,PP,iShock,SaFi,BSA,ATSVI,ATSVI_eco,DTSVI_est,atsvi_method,GC,IC,FEVI_epss,FEVI_simp,FAC,CFA,CaO2,CvO2,DifCaV,DO2I,VO2I,O2ER,DeltaCO2,DepLac,RVS,CPO,IC_VCI,ID_VCI,DELTA_VCI,PVC_est,pvc_est_label,pvc_fuente,vci_max,vci_min,vci_modo} = c;
  const alerts=[];
  if(IC!==null&&IC<2.2) alerts.push({color:"red",icon:"⚠️",title:`IC bajo — ${IC} L/min/m²`,body:"Umbral shock cardiogénico · Evaluar inotrópico"});
  if(CPO!==null&&CPO<0.6) alerts.push({color:"red",icon:"⚠️",title:`CPO bajo — ${CPO} W`,body:"Predictor independiente mortalidad en shock"});
  if(DeltaCO2!==null&&DeltaCO2>=6) alerts.push({color:"yellow",icon:"⚠️",title:`ΔCO₂ elevado — ${DeltaCO2} mmHg`,body:"Flujo insuficiente · Perfusión tisular comprometida"});
  if(O2ER!==null&&O2ER>30) alerts.push({color:"yellow",icon:"⚠️",title:`Extracción O₂ alta — ${O2ER}%`,body:"Compensación periférica activa"});
  if(DepLac!==null&&DepLac<10) alerts.push({color:"yellow",icon:"⚠️",title:`Depuración lactato — ${DepLac}%`,body:"Meta >10% en 2h · Reevaluar resucitación"});
  if(RVS!==null&&RVS<750) alerts.push({color:"yellow",icon:"⚠️",title:`RVS baja — ${RVS} WU`,body:"Perfil distributivo · Evaluar vasopresor"});
  if(n(v.tapse)!==null&&n(v.tapse)<17) alerts.push({color:"yellow",icon:"⚠️",title:`Disfunción VD — TAPSE ${v.tapse}mm`,body:"Evaluar cor pulmonale / TEP"});
  if(IC!==null&&IC>=2.5&&CPO!==null&&CPO>=0.6&&(O2ER===null||O2ER<=30)) alerts.push({color:"green",icon:"✅",title:"Hemodinamia compensada",body:"IC y CPO dentro de metas"});

  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
      {/* COL 1 */}
      <div>
        <SL text="Macrohemodinamia" />
        <Card>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <BM label="PAM" value={PAM} unit="mmHg" color={!PAM?T.label:PAM>=65?T.green:PAM>=60?T.yellow:T.red} />
            <BM label="Presión de Pulso" value={PP} unit="mmHg" color={!PP?T.label:PP>=40?T.green:PP>=25?T.yellow:T.red} />
            <BM label="Índice de Shock" value={iShock} color={!iShock?T.label:iShock<0.7?T.green:iShock<1.0?T.yellow:T.red} />
            <BM label="SaFi" value={SaFi} color={!SaFi?T.label:SaFi>=315?T.green:SaFi>=235?T.yellow:T.red} />
          </div>
          {BSA&&<div style={{marginTop:10,padding:"10px 14px",background:T.surface2,borderRadius:10,display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:8}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:11,color:T.label,marginBottom:2}}>ASC</div><div style={{fontSize:16,fontWeight:700,color:ACCENT}}>{BSA} m²</div></div>
            {ATSVI&&<div style={{textAlign:"center"}}><div style={{fontSize:11,color:T.label,marginBottom:2}}>ATSVI ({atsvi_method})</div><div style={{fontSize:16,fontWeight:700,color:atsvi_method==="estimado"?T.yellow:ACCENT}}>{ATSVI} cm²</div></div>}
            {DTSVI_est&&!ATSVI_eco&&<div style={{textAlign:"center"}}><div style={{fontSize:11,color:T.label,marginBottom:2}}>D TSVI est.</div><div style={{fontSize:16,fontWeight:700,color:T.yellow}}>{DTSVI_est} mm</div></div>}
          </div>}
          {atsvi_method==="estimado"&&<IBox text="ATSVI estimada por 5.7×SC+12.1 — medir por eco cuando sea posible" />}
        </Card>

        {/* VCI */}
        {(IC_VCI!==null||ID_VCI!==null)&&(
          <>
            <SL text="VCI — Índices y PVC" />
            <Card>
              <div style={{padding:"6px 10px",background:ACCENT_LIGHT,borderRadius:8,fontSize:11,fontWeight:600,color:ACCENT_MID,marginBottom:10}}>
                {vci_modo==="espontaneo"&&"🫁 Resp. espontánea — Índice de Colapsabilidad"}
                {vci_modo==="vm_invasiva"&&"⚙️ VM invasiva — Índice de Distensibilidad"}
                {vci_modo==="vni"&&"😷 VNI/CPAP — Interpretar con cautela"}
              </div>
              {vci_max!==null&&<Row label="VCI máximo" value={`${vci_max} mm`} color={vci_max>21?"red":"green"} normal="Normal ≤21 mm" />}
              {vci_min!==null&&<Row label="VCI mínimo" value={`${vci_min} mm`} noStatus />}
              {DELTA_VCI!==null&&<Row label="ΔVCI (variabilidad)" value={`${DELTA_VCI} mm`} color={DELTA_VCI>=2.9?"green":"red"} normal="Respondedor ≥2.9 mm" />}
              {vci_modo==="espontaneo"&&IC_VCI!==null&&<Row label="IC-VCI (Colapsabilidad)" value={`${IC_VCI}%`} color={IC_VCI>=50?"green":IC_VCI>=35?"yellow":"red"} normal="Respondedor >50%" />}
              {vci_modo==="vm_invasiva"&&ID_VCI!==null&&<Row label="ID-VCI (Distensibilidad)" value={`${ID_VCI}%`} color={ID_VCI>=18?"green":ID_VCI>=12?"yellow":"red"} normal="Respondedor >18%" />}
              {vci_modo==="vni"&&IC_VCI!==null&&<Row label="IC-VCI (cautela)" value={`${IC_VCI}%`} color="yellow" normal="Interpretar con contexto" />}
              {vci_modo==="espontaneo"&&PVC_est!==null&&(
                <div style={{marginTop:8,padding:"12px 14px",background:PVC_est<=3?"#F0FBF3":PVC_est>=15?"#FFF0EF":"#FFF8F0",borderRadius:10,border:`1px solid ${PVC_est<=3?"#34C75940":PVC_est>=15?"#FF3B3040":"#FF950040"}`}}>
                  <div style={{fontSize:11,fontWeight:600,color:T.label,marginBottom:4}}>PVC ESTIMADA — Tabla ASE</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontSize:22,fontWeight:800,color:PVC_est<=3?T.green:PVC_est>=15?T.red:T.yellow}}>{PVC_est} mmHg</div>
                    <div style={{fontSize:12,fontWeight:600,color:T.label}}>{pvc_est_label}</div>
                  </div>
                  <div style={{fontSize:11,color:T.label,marginTop:4}}>Fuente PVC en RVS: {pvc_fuente}</div>
                </div>
              )}
              {vci_modo==="espontaneo"&&(
                <div style={{marginTop:10,background:T.surface2,borderRadius:10,overflow:"hidden"}}>
                  <div style={{padding:"7px 12px",fontSize:11,fontWeight:600,color:T.label,letterSpacing:"0.03em",textTransform:"uppercase"}}>Tabla ASE</div>
                  {[["≤21mm","Colapso >50%","3 mmHg","0–5","green"],["≤21mm","Colapso <50%","8 mmHg","5–10","yellow"],[">21mm","Colapso >50%","8 mmHg","5–10","yellow"],[">21mm","Colapso <50%","15 mmHg","10–20","red"]].map(([d,col_,pvc,rng,color],i)=>(
                    <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"7px 12px",borderTop:i>0?`1px solid ${T.border}`:"none",background:SEM[color].bg}}>
                      <span style={{fontSize:11,color:T.text,fontWeight:500}}>{d}</span>
                      <span style={{fontSize:11,color:T.label}}>{col_}</span>
                      <span style={{fontSize:12,fontWeight:700,color:SEM[color].txt,textAlign:"right"}}>{pvc} <span style={{fontWeight:400,color:T.label}}>({rng})</span></span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </>
        )}

        {alerts.length>0&&(
          <>
            <SL text="Interpretación" />
            {alerts.map((a,i)=><Alrt key={i} {...a} />)}
          </>
        )}
      </div>

      {/* COL 2 */}
      <div>
        {(GC||IC||FEVI_epss!==null||FEVI_simp!==null||FAC!==null||CFA!==null)&&(
          <>
            <SL text="ECO — Función Sistólica" />
            <Card>
              {(GC||IC)&&<div style={{marginBottom:10}}><G2>
                {GC&&<BM label="Gasto Cardíaco" value={GC} unit="L/min" color={GC>=4?T.green:GC>=3?T.yellow:T.red} />}
                {IC&&<BM label="Índice Cardíaco" value={IC} unit="L/min/m²" color={IC>=2.5?T.green:IC>=2.2?T.yellow:T.red} />}
              </G2></div>}
              {FEVI_epss!==null&&<Row label="FEVI por E/Septum" value={FEVI_epss} unit="%" color={FEVI_epss>=50?"green":FEVI_epss>=35?"yellow":"red"} normal="Meta ≥50%" />}
              {FEVI_simp!==null&&<Row label="FEVI Simpson's" value={FEVI_simp} unit="%" color={FEVI_simp>=50?"green":FEVI_simp>=35?"yellow":"red"} normal="Meta ≥50%" />}
              {FAC!==null&&<Row label="FAC — Fracción de Acortamiento" value={FAC} unit="%" color={FAC>=28?"green":FAC>=20?"yellow":"red"} normal="VN >28%" />}
              {CFA!==null&&<Row label="CFA — Cambio Fraccional de Área" value={CFA} unit="%" color={CFA>=40?"green":CFA>=30?"yellow":"red"} normal="VN >40%" />}
              {n(v.mapse)!==null&&<Row label="MAPSE / ESPAM lateral" value={n(v.mapse)} unit="mm" color={n(v.mapse)>=16?"green":n(v.mapse)>=10?"yellow":"red"} normal="VN >16 mm" />}
              {n(v.tapse)!==null&&<Row label="TAPSE (VD)" value={n(v.tapse)} unit="mm" color={n(v.tapse)>=17?"green":n(v.tapse)>=14?"yellow":"red"} normal="VN >17 mm" />}
              {n(v.rvlv)!==null&&<Row label="Relación VD/VI" value={n(v.rvlv)} color={n(v.rvlv)<0.6?"green":n(v.rvlv)<1.0?"yellow":"red"} normal="VN <0.6" />}
              {n(v.epss)!==null&&(
                <div style={{marginTop:10,background:T.surface2,borderRadius:10,overflow:"hidden"}}>
                  <div style={{padding:"8px 12px 6px",fontSize:11,fontWeight:600,color:T.label,letterSpacing:"0.03em",textTransform:"uppercase"}}>Tabla FEVI vs E/Septum</div>
                  {[["≥60%","<7.4 mm","green"],["59–61%","7.4–8.9 mm","green"],["40–54%","9–13.9 mm","yellow"],["30–39%","14–17.1 mm","red"],["<30%",">17.1 mm","red"]].map(([f,e,col],i)=>{
                    const ep=n(v.epss);
                    const active=(f==="<30%"&&ep>17.1)||(f==="30–39%"&&ep>=14&&ep<=17.1)||(f==="40–54%"&&ep>=9&&ep<14)||(f==="59–61%"&&ep>=7.4&&ep<9)||(f==="≥60%"&&ep<7.4);
                    return <div key={f} style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:active?SEM[col].bg:"transparent",borderTop:i>0?`1px solid ${T.border}`:"none"}}>
                      <span style={{fontSize:13,fontWeight:active?700:400,color:active?SEM[col].txt:T.text}}>{f}</span>
                      <span style={{fontSize:13,color:active?SEM[col].txt:T.label}}>{e}</span>
                    </div>;
                  })}
                </div>
              )}
            </Card>
          </>
        )}

        {(CaO2||DO2I||O2ER||DeltaCO2||RVS||CPO)&&(
          <>
            <SL text="Microhemodinamia" />
            <Card>
              {CaO2!==null&&<Row label="CaO₂" value={CaO2} unit="mL/dL" color={CaO2>=17?"green":CaO2>=14?"yellow":"red"} normal="17–20" />}
              {CvO2!==null&&<Row label="CvO₂" value={CvO2} unit="mL/dL" color={CvO2>=12?"green":CvO2>=10?"yellow":"red"} normal="12–15" />}
              {DifCaV!==null&&<Row label="Dif Ca–Cv O₂" value={DifCaV} unit="mL/dL" color={DifCaV>=4&&DifCaV<=5?"green":"yellow"} normal="4–5" />}
              {DO2I!==null&&<Row label="DO₂I (aporte O₂)" value={DO2I} unit="mL/min/m²" color={DO2I>=550?"green":DO2I>=400?"yellow":"red"} normal="550–650" />}
              {VO2I!==null&&<Row label="VO₂I (consumo O₂)" value={VO2I} unit="mL/min/m²" color={VO2I>=115&&VO2I<=165?"green":"yellow"} normal="115–165" />}
              {O2ER!==null&&<Row label="Extracción O₂" value={O2ER} unit="%" color={O2ER<=30?"green":O2ER<=40?"yellow":"red"} normal="20–30%" />}
              {DeltaCO2!==null&&<Row label="ΔCO₂ venosa–arterial" value={DeltaCO2} unit="mmHg" color={DeltaCO2<6?"green":DeltaCO2<8?"yellow":"red"} normal="<6 mmHg" />}
              {DepLac!==null&&<Row label="Depuración Lactato 2h" value={DepLac} unit="%" color={DepLac>=10?"green":DepLac>=5?"yellow":"red"} normal=">10% en 2h" />}
              {(RVS||CPO)&&<div style={{marginTop:8}}><G2>
                {RVS&&<BM label="RVS" value={RVS} unit="WU" color={RVS>=750&&RVS<=1500?T.green:RVS<750?T.yellow:T.red} />}
                {CPO&&<BM label="CPO" value={CPO} unit="W" color={CPO>=0.6?T.green:CPO>=0.4?T.yellow:T.red} />}
              </G2></div>}
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

function HemoTab({ state, setState }) {
  const [view,setView]=useState("datos");
  const set=k=>val=>setState(d=>({...d,[k]:val}));
  const c=useCalcs(state);
  return (
    <div>
      <div style={{padding:"0 0 14px"}}><VT value={view} onChange={setView} /></div>
      {view==="datos"?<HemoInputs v={state} set={set} />:<HemoResults c={c} v={state} />}
    </div>
  );
}

// ─── VENT ─────────────────────────────────────────────────────────────────────
function VentTab({ state, setState }) {
  const [view,setView]=useState("datos");
  const v=state;
  const set=k=>val=>setState(d=>({...d,[k]:val}));
  const IBW=useMemo(()=>{const h=n(v.altura);if(!h)return null;return r(v.sexo==="M"?50+0.91*(h-152.4):45.5+0.91*(h-152.4),1);},[v.altura,v.sexo]);
  const VTkg=useMemo(()=>{const vt=n(v.vt);if(!vt||!IBW)return null;return r(vt/IBW,1);},[v.vt,IBW]);
  const DP=useMemo(()=>{const pp=n(v.pplat),pe=n(v.peep);if(pp===null||pe===null)return null;return r(pp-pe,1);},[v.pplat,v.peep]);
  const Crs=useMemo(()=>{const vt=n(v.vt);if(!vt||!DP)return null;return r(vt/DP,1);},[v.vt,DP]);
  const MP=useMemo(()=>{const fr=n(v.fr),vt=n(v.vt),pk=n(v.ppico);if(!fr||!vt||!pk||!DP)return null;return r(0.098*fr*vt*(pk-DP/2),1);},[v.fr,v.vt,v.ppico,DP]);
  const PaFi=useMemo(()=>{const po=n(v.pao2),fi=n(v.fio2);if(!po||!fi)return null;return r(po/(fi/100),0);},[v.pao2,v.fio2]);
  const SaFi=useMemo(()=>{const s=n(v.spo2),fi=n(v.fio2);if(!s||!fi)return null;return r(s/(fi/100),0);},[v.spo2,v.fio2]);
  const RSBI=useMemo(()=>{const fr=n(v.fr),vt=n(v.vt);if(!fr||!vt)return null;return r(fr/(vt/1000),0);},[v.fr,v.vt]);
  const berlin=PaFi===null?null:PaFi>=300?"Sin SDRA":PaFi>=200?"SDRA Leve":PaFi>=100?"SDRA Moderado":"SDRA Severo";
  const berlinColor=PaFi===null?T.label:PaFi>=300?T.green:PaFi>=200?T.yellow:T.red;
  const predFallo=[];
  if(n(v.nif)!==null&&n(v.nif)>-30) predFallo.push(`NIF ${v.nif} cmH₂O (meta ≤ −30)`);
  if(RSBI!==null&&RSBI>=100) predFallo.push(`RSBI ${RSBI} rpm/L (meta <100)`);
  if(n(v.p01)!==null&&n(v.p01)<-3) predFallo.push(`P0.1 ${v.p01} cmH₂O (meta ≥ −3)`);
  if(n(v.excursion_diaf)!==null&&n(v.excursion_diaf)<2) predFallo.push(`Excursión diafragma ${v.excursion_diaf} cm (meta >2 cm)`);

  return (
    <div>
      <div style={{padding:"0 0 14px"}}><VT value={view} onChange={setView} /></div>
      {view==="datos"?(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
          <div>
            <SL text="Paciente" /><Card><G2><Sel label="Sexo" value={v.sexo} onChange={set("sexo")} options={[{v:"M",l:"Masculino"},{v:"F",l:"Femenino"}]} /><Inp label="Talla" unit="cm" value={v.altura} onChange={set("altura")} /></G2></Card>
            <SL text="Parámetros Ventilatorios" /><Card><G2>
              <Inp label="VT" unit="mL" value={v.vt} onChange={set("vt")} hint="Meta: 6 mL/kg IBW" />
              <Inp label="FR" unit="rpm" value={v.fr} onChange={set("fr")} />
              <Inp label="PEEP" unit="cmH₂O" value={v.peep} onChange={set("peep")} />
              <Inp label="FiO₂" unit="%" value={v.fio2} onChange={set("fio2")} />
              <Inp label="P. Pico" unit="cmH₂O" value={v.ppico} onChange={set("ppico")} />
              <Inp label="P. Plateau" unit="cmH₂O" value={v.pplat} onChange={set("pplat")} hint="Meta ≤30" />
            </G2></Card>
          </div>
          <div>
            <SL text="Gasometría" /><Card><G2><Inp label="PaO₂" unit="mmHg" value={v.pao2} onChange={set("pao2")} /><Inp label="SpO₂" unit="%" value={v.spo2} onChange={set("spo2")} /></G2></Card>
            <SL text="Predictores de Destete" /><Card><G2>
              <Inp label="NIF" unit="cmH₂O" value={v.nif} onChange={set("nif")} hint="Meta ≤ −30" placeholder="-28" />
              <Inp label="P0.1" unit="cmH₂O" value={v.p01} onChange={set("p01")} hint="Meta ≥ −3" placeholder="-2" />
              <Inp label="Excursión diafragma" unit="cm" value={v.excursion_diaf} onChange={set("excursion_diaf")} hint=">2 cm (USG)" />
              <Inp label="Grosor diafragma" unit="mm" value={v.grosor_diaf} onChange={set("grosor_diaf")} hint=">3 mm" />
            </G2></Card>
          </div>
        </div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
          <div>
            <SL text="Mecánica Ventilatoria" /><Card>
              {IBW&&<Row label="Peso Ideal (IBW)" value={IBW} unit="kg" noStatus />}
              {VTkg!==null&&<Row label="VT/kg IBW" value={VTkg} unit="mL/kg" color={VTkg<=6?"green":VTkg<=8?"yellow":"red"} normal="Meta 6 mL/kg" />}
              {DP!==null&&<Row label="Driving Pressure (ΔP)" value={DP} unit="cmH₂O" color={DP<=15?"green":DP<=20?"yellow":"red"} normal="Meta <15 cmH₂O" />}
              {Crs!==null&&<Row label="Distensibilidad (Crs)" value={Crs} unit="mL/cmH₂O" color={Crs>=40?"green":Crs>=25?"yellow":"red"} normal="30–50 mL/cmH₂O" />}
              {MP!==null&&<Row label="Mechanical Power" value={MP} unit="J/min" color={MP<17?"green":MP<20?"yellow":"red"} normal="Meta <17 J/min" />}
            </Card>
          </div>
          <div>
            <SL text="Oxigenación" /><Card>
              {PaFi!==null&&<Row label="PaO₂/FiO₂" value={PaFi} color={PaFi>=300?"green":PaFi>=200?"yellow":"red"} normal="Normal ≥300" />}
              {SaFi!==null&&<Row label="SpO₂/FiO₂ (surrogate)" value={SaFi} color={SaFi>=315?"green":SaFi>=235?"yellow":"red"} normal="Normal ≥315" />}
              {berlin&&<div style={{marginTop:8,padding:"14px 16px",borderRadius:12,background:T.surface2,textAlign:"center",border:`1px solid ${berlinColor}30`}}><div style={{fontSize:18,fontWeight:700,color:berlinColor}}>{berlin}</div></div>}
              <div style={{marginTop:10,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4,textAlign:"center"}}>
                {[["Sin SDRA","≥300",T.green],["Leve","200–299",T.yellow],["Moderado","100–199","#FF6600"],["Severo","<100",T.red]].map(([l,rng,col])=>(
                  <div key={l} style={{padding:"7px 4px",background:T.surface2,borderRadius:8}}><div style={{fontSize:10,fontWeight:700,color:col}}>{l}</div><div style={{fontSize:10,color:T.label}}>{rng}</div></div>
                ))}
              </div>
            </Card>
            <SL text="Predictores de Destete" /><Card>
              {RSBI!==null&&<Row label="RSBI (FR/VT)" value={RSBI} unit="rpm/L" color={RSBI<80?"green":RSBI<100?"yellow":"red"} normal="Meta <100" />}
              {n(v.nif)!==null&&<Row label="NIF" value={n(v.nif)} unit="cmH₂O" color={n(v.nif)<=-30?"green":n(v.nif)<=-20?"yellow":"red"} normal="Meta ≤ −30" />}
              {n(v.p01)!==null&&<Row label="P0.1" value={n(v.p01)} unit="cmH₂O" color={n(v.p01)>=-3?"green":n(v.p01)>=-5?"yellow":"red"} normal="Meta ≥ −3" />}
              {n(v.excursion_diaf)!==null&&<Row label="Excursión diafragma" value={n(v.excursion_diaf)} unit="cm" color={n(v.excursion_diaf)>=2?"green":"red"} normal=">2 cm" />}
              {predFallo.length===0&&RSBI!==null?<Alrt color="green" icon="✅" title="Sin predictores de fallo" body="Considerar PVE" />
              :predFallo.length>0?<Alrt color="red" icon="⚠️" title="Predictores de fallo presentes" body={predFallo.join(" · ")} />:null}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── VEXUS ────────────────────────────────────────────────────────────────────
function VexusTab({ state, setState }) {
  const v=state;
  const set=k=>val=>setState(d=>({...d,[k]:val}));
  const cv=n(v.vci_d)!==null&&n(v.vci_col)!==null?(n(v.vci_d)>=21&&n(v.vci_col)<50):null;
  const cp=n(v.portal_ip)!==null?n(v.portal_ip)>30:null;
  const cr=v.renal_patron!=="normal";
  const ch=v.hepatica!=="normal";
  const score=[cv,cp,cr,ch].filter(x=>x===true).length;
  const grade=cv===null?null:!cv?0:score<=1?1:score<=2?2:3;
  const gradeColor=grade===null?T.label:grade===0?T.green:grade===1?T.yellow:grade===2?"#FF6600":T.red;
  const gradeLabel=grade===null?"—":grade===0?"Sin congestión":grade===1?"Congestión leve":grade===2?"Congestión moderada":"Congestión severa";

  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
      <div>
        <SL text="VCI — Requisito" /><Card>
          <G2><Inp label="Diámetro VCI" unit="mm" value={v.vci_d} onChange={set("vci_d")} hint="≥21mm = congesta" /><Inp label="Colapsabilidad" unit="%" value={v.vci_col} onChange={set("vci_col")} hint="<50% = no colapsa" /></G2>
          {n(v.vci_d)!==null&&<div style={{marginTop:8}}><Row label="VCI congesta" value={cv?"Sí":"No"} color={cv?"red":"green"} /></div>}
        </Card>
        <SL text="Vena Portal" /><Card>
          <Inp label="Índice de Pulsatilidad Portal" unit="%" value={v.portal_ip} onChange={set("portal_ip")} hint="(Vmáx−Vmín)/Vmáx × 100 — Patológico >30%" />
          {n(v.portal_ip)!==null&&<div style={{marginTop:8}}><Row label="IP Portal" value={`${v.portal_ip}%`} color={n(v.portal_ip)<=30?"green":n(v.portal_ip)<=50?"yellow":"red"} normal="VN ≤30%" /></div>}
        </Card>
        <SL text="Vena Renal" /><Card>
          <Sel label="Patrón de flujo renal" value={v.renal_patron} onChange={set("renal_patron")} options={[{v:"normal",l:"Continuo (normal)"},{v:"bifasico",l:"Bifásico — discontinuo leve"},{v:"monofasico",l:"Monofásico — discontinuo severo"},{v:"ausente",l:"Ausente — obstrucción severa"}]} />
          <div style={{marginTop:10,padding:"10px 12px",borderRadius:10,fontSize:13,lineHeight:1.4,background:v.renal_patron==="normal"?SEM.green.bg:v.renal_patron==="bifasico"?SEM.yellow.bg:SEM.red.bg,color:v.renal_patron==="normal"?SEM.green.txt:v.renal_patron==="bifasico"?SEM.yellow.txt:SEM.red.txt}}>
            {v.renal_patron==="normal"&&"Flujo continuo — Sin congestión venosa renal"}
            {v.renal_patron==="bifasico"&&"Flujo bifásico — Congestión moderada · Interrupciones diastólicas"}
            {v.renal_patron==="monofasico"&&"Flujo monofásico — Congestión severa · Riesgo AKI"}
            {v.renal_patron==="ausente"&&"Flujo ausente — Obstrucción venosa severa"}
          </div>
        </Card>
        <SL text="Vena Hepática (complementario)" /><Card>
          <Sel label="Patrón vena hepática" value={v.hepatica} onChange={set("hepatica")} options={[{v:"normal",l:"Onda S > D (normal)"},{v:"sd_igual",l:"S ≈ D (leve)"},{v:"d_mayor",l:"D > S (moderado)"},{v:"inversion",l:"Inversión onda S (severo)"}]} />
        </Card>
      </div>
      <div>
        <SL text="Score VExUS" /><Card>
          {grade===null?<div style={{textAlign:"center",padding:24,color:T.label,fontSize:14}}>Ingresa datos de VCI para graduar</div>:(
            <div>
              <div style={{textAlign:"center",padding:"20px 16px 16px",borderRadius:12,background:T.surface2,marginBottom:14}}>
                <div style={{fontSize:56,fontWeight:800,color:gradeColor,lineHeight:1}}>{grade}</div>
                <div style={{fontSize:15,color:gradeColor,fontWeight:600,marginTop:6}}>{gradeLabel}</div>
              </div>
              {[[`VCI ≥21mm + colapso <50%`,cv,"Requisito"],[`Portal IP >30%`,cp,"Portal"],["Renal discontinuo",cr,"Renal"],["Hepática alterada",ch,"Hepática"]].map(([lbl,val,cat])=>(
                <Row key={lbl} label={lbl} value={val===true?"Sí":val===false?"No":"—"} color={val===true?"red":val===false?"green":"gray"} normal={cat} />
              ))}
              {grade>=2&&<Alrt color="red" icon="⚠️" title="Congestión significativa" body="Restricción hídrica · Evaluar diuréticos o ultrafiltración" />}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── NEURO ────────────────────────────────────────────────────────────────────
function NeuroTab({ state, setState }) {
  const [view,setView]=useState("datos");
  const v=state;
  const set=k=>val=>setState(d=>({...d,[k]:val}));
  const IP=useMemo(()=>{const vps=n(v.vps),vfd=n(v.vfd),vm=n(v.vm);if(vps===null||vfd===null||!vm)return null;return r((vps-vfd)/vm,2);},[v.vps,v.vfd,v.vm]);
  const PPC=useMemo(()=>{const pam=n(v.pam),vfd=n(v.vfd),vm=n(v.vm);if(!pam||!vfd||!vm)return null;return r(pam*vfd/vm+14,1);},[v.pam,v.vfd,v.vm]);
  const PIC=useMemo(()=>{if(IP===null)return null;return r(10.93*IP-1.28,1);},[IP]);
  const Lind=useMemo(()=>{const vm=n(v.vm),aci=n(v.vm_aci);if(!vm||!aci)return null;return r(vm/aci,2);},[v.vm,v.vm_aci]);
  const DLM=useMemo(()=>{const a=n(v.dlm_a),b=n(v.dlm_b);if(!a||!b)return null;return r(Math.abs(a-b)/2,1);},[v.dlm_a,v.dlm_b]);
  const vps=n(v.vps);
  const veColor=vps===null?"gray":vps<80?"green":vps<160?"yellow":"red";
  const veLabel=vps===null?null:vps<80?"Normal":vps<120?"Límite":vps<160?"Vasoespasmo leve":vps<200?"Vasoespasmo moderado":"Vasoespasmo grave";
  const lindColor=Lind===null?"gray":Lind<3?"yellow":Lind<=6?"yellow":"red";
  const lindLabel=Lind===null?null:Lind<3?"Hiperemia":Lind<=6?"Vasoespasmo leve-mod":"Vasoespasmo grave";

  return (
    <div>
      <div style={{padding:"0 0 14px"}}><VT value={view} onChange={setView} /></div>
      {view==="datos"?(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
          <div>
            <SL text="Doppler Transcraneal — ACM" /><Card><G2>
              <Inp label="VPS (pico sistólico)" unit="cm/s" value={v.vps} onChange={set("vps")} hint="VN <80 cm/s" />
              <Inp label="VFD (fin diástole)" unit="cm/s" value={v.vfd} onChange={set("vfd")} />
              <Inp label="VM (velocidad media)" unit="cm/s" value={v.vm} onChange={set("vm")} />
              <Inp label="PAM" unit="mmHg" value={v.pam} onChange={set("pam")} hint="Para PPC estimada" />
            </G2></Card>
          </div>
          <div>
            <SL text="Índice de Lindegaard" /><Card><Inp label="VM Arteria Carótida Interna (ACI)" unit="cm/s" value={v.vm_aci} onChange={set("vm_aci")} hint="Doppler a nivel mandibular" /></Card>
            <SL text="Desviación Línea Media" /><Card>
              <G2><Inp label="A (temporal → 3er ventrículo)" unit="cm" value={v.dlm_a} onChange={set("dlm_a")} /><Inp label="B (temporal contralateral)" unit="cm" value={v.dlm_b} onChange={set("dlm_b")} /></G2>
              <div style={{marginTop:8,fontSize:12,color:T.label}}>DLM = |A − B| / 2</div>
            </Card>
          </div>
        </div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
          <div>
            <SL text="Resultados DTC" /><Card>
              {vps!==null&&<Row label="VPS ACM" value={vps} unit="cm/s" color={veColor} normal="VN <80 cm/s" />}
              {IP!==null&&<Row label="Índice de Pulsatilidad (IP)" value={IP} color={IP>=0.6&&IP<=1.1?"green":IP>1.1&&IP<=1.4?"yellow":"red"} normal="VN 0.6–1.1" />}
              {PPC!==null&&<Row label="PPC estimada" value={PPC} unit="mmHg" color={PPC>=60?"green":PPC>=50?"yellow":"red"} normal="Meta ≥60 mmHg" />}
              {PIC!==null&&<Row label="PIC estimada (DTC)" value={PIC} unit="mmHg" color={PIC<=15?"green":PIC<=20?"yellow":"red"} normal="VN ≤15 mmHg" />}
              {Lind!==null&&<Row label="Índice de Lindegaard" value={Lind} color={lindColor} normal="Hiperemia <3 · Espasmo >6" />}
              {DLM!==null&&<Row label="Desviación Línea Media" value={DLM} unit="cm" color={DLM<0.5?"green":DLM<1?"yellow":"red"} normal="VN <0.5 cm" />}
            </Card>
          </div>
          <div>
            {(veLabel||lindLabel||IP)&&(
              <>
                <SL text="Interpretación" />
                {veLabel&&<Alrt color={veColor==="green"?"green":veColor==="yellow"?"yellow":"red"} icon={veColor==="green"?"✅":"⚠️"} title={`VPS ACM: ${veLabel}`} body={`${v.vps} cm/s`} />}
                {IP!==null&&IP>1.1&&<Alrt color="red" icon="⚠️" title="IP elevado — Resistencias altas" body="Evaluar PIC elevada · Considerar monitoreo invasivo" />}
                {Lind!==null&&<Alrt color={Lind<3?"yellow":"red"} icon="⚠️" title={`Lindegaard ${Lind}: ${lindLabel}`} body={Lind<3?"Hiperemia — no vasoespasmo verdadero":Lind>6?"Vasoespasmo grave — Riesgo infarto cerebral":"Vasoespasmo leve a moderado"} />}
                {PIC!==null&&PIC>20&&<Alrt color="red" icon="⚠️" title={`PIC estimada elevada — ${PIC} mmHg`} body="Considerar monitoreo invasivo · Osmoterapia" />}
              </>
            )}
            <SL text="Fórmulas" /><Card>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                {[["IP = (VPS−VFD)/VM","0.6–1.1"],["PPC = PAM×VFD/VM + 14","≥60 mmHg"],["PIC = 10.93×IP − 1.28","≤15 mmHg"],["Lindegaard = VM ACM/ACI","<3 = hiperemia"],["VPS espasmo grave","≥200 cm/s"],["Lindegaard espasmo",">6"]].map(([f,val])=>(
                  <div key={f} style={{padding:"9px 10px",background:T.surface2,borderRadius:8}}>
                    <div style={{fontSize:11,color:T.label,marginBottom:2}}>{f}</div>
                    <div style={{fontSize:12,fontWeight:600,color:ACCENT}}>{val}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
const TABS=[{id:"hemo",icon:"🫀",label:"Hemodinamia"},{id:"vent",icon:"🫁",label:"Ventilación"},{id:"vexus",icon:"🩸",label:"VExUS"},{id:"neuro",icon:"🧠",label:"Neurología"}];
const INIT={
  hemo:{fc:"",pas:"",pad:"",spo2:"",fio2_basic:"21",altura:"",peso:"",pao2:"",paco2:"",hco3a:"",sao2:"",pvco2:"",pvo2:"",svo2:"",hb:"",pvc:"",lactato1:"",lactato2:"",dtsvi:"",vti:"",epss:"",fevi_simpson:"",fac_dd:"",fac_ds:"",cfa_fd:"",cfa_fs:"",mapse:"",tapse:"",rvlv:"",vci_max:"",vci_min:"",vci_modo:"espontaneo"},
  vent:{sexo:"M",altura:"",vt:"",fr:"",peep:"",fio2:"",ppico:"",pplat:"",pao2:"",spo2:"",nif:"",p01:"",excursion_diaf:"",grosor_diaf:""},
  vexus:{vci_d:"",vci_col:"",portal_ip:"",renal_patron:"normal",hepatica:"normal"},
  neuro:{vps:"",vfd:"",vm:"",vm_aci:"",pam:"",dlm_a:"",dlm_b:""},
};

export default function App() {
  const [tab,setTab]=useState("hemo");
  const [states,setStates]=useState(INIT);
  const [pac,setPac]=useState({nombre:"",hc:"",cama:"",fecha:new Date().toISOString().split("T")[0]});
  const setP=k=>val=>setPac(d=>({...d,[k]:val}));
  const setTabState=tabId=>updater=>setStates(s=>({...s,[tabId]:typeof updater==="function"?updater(s[tabId]):updater}));

  return (
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Text','Segoe UI',sans-serif"}}>
      <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}@media print{button{display:none}}`}</style>

      {/* HEADER */}
      <div style={{background:"rgba(242,242,247,0.95)",borderBottom:`1px solid ${T.border}`,position:"sticky",top:0,zIndex:20,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"12px 24px"}}>
          {/* Top row */}
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:12}}>
            <div>
              <div style={{fontSize:26,fontWeight:800,letterSpacing:"-0.5px",color:T.text,lineHeight:1}}>
                UCI<span style={{color:ACCENT}}>calc</span>
              </div>
              <div style={{fontSize:12,color:T.label,marginTop:3}}>Medicina Crítica</div>
            </div>
            <button onClick={()=>window.print()} style={{background:ACCENT,color:"white",border:"none",borderRadius:10,padding:"9px 20px",fontSize:13,fontWeight:600,cursor:"pointer"}}>
              🖨 PDF
            </button>
          </div>

          {/* Paciente */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 160px",gap:8,marginBottom:12}}>
            <input value={pac.nombre} onChange={e=>setP("nombre")(e.target.value)} placeholder="Nombre del paciente" style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"8px 12px",fontSize:13,color:T.text,outline:"none"}} />
            <input value={pac.hc} onChange={e=>setP("hc")(e.target.value)} placeholder="HC / Expediente" style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"8px 12px",fontSize:13,color:T.text,outline:"none"}} />
            <input value={pac.cama} onChange={e=>setP("cama")(e.target.value)} placeholder="Cama" style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"8px 12px",fontSize:13,color:T.text,outline:"none"}} />
            <input type="date" value={pac.fecha} onChange={e=>setP("fecha")(e.target.value)} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"8px 12px",fontSize:13,color:T.label,outline:"none"}} />
          </div>

          {/* Tabs */}
          <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,gap:0}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 20px",fontSize:13,fontWeight:600,border:"none",cursor:"pointer",background:"transparent",color:tab===t.id?ACCENT:T.label,borderBottom:tab===t.id?`2px solid ${ACCENT}`:"2px solid transparent",transition:"all 0.15s"}}>
                <span style={{fontSize:16}}>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{maxWidth:1280,margin:"0 auto",padding:"20px 24px 60px"}}>
        {tab==="hemo"&&<HemoTab state={states.hemo} setState={setTabState("hemo")} />}
        {tab==="vent"&&<VentTab state={states.vent} setState={setTabState("vent")} />}
        {tab==="vexus"&&<VexusTab state={states.vexus} setState={setTabState("vexus")} />}
        {tab==="neuro"&&<NeuroTab state={states.neuro} setState={setTabState("neuro")} />}
      </div>

      <div style={{textAlign:"center",fontSize:11,color:T.label,padding:"0 24px 24px",lineHeight:1.6}}>
        Soporte clínico únicamente · No reemplaza el juicio médico · AHA 2025 · ASE · ARDSnet · ESICM 2025
      </div>
    </div>
  );
}