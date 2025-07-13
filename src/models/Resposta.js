module.exports = (sequelize, DataTypes) => {
    const Resposta = sequelize.define('Resposta', {
        texto: DataTypes.STRING,
        resultado: DataTypes.BOOLEAN
    });

    Resposta.associate = models => {
        Resposta.belongsTo(models.Pergunta, { foreignKey: 'perguntaId' });
        Resposta.hasMany(models.HistoricoResposta, { foreignKey: 'respostaId' });
    };

    return Resposta;
};