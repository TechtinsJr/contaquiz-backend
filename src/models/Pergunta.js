module.exports = (sequelize, DataTypes) => {
    const Pergunta = sequelize.define('Pergunta', {
        texto: DataTypes.STRING,
        tempo: DataTypes.TIME
    });

    Pergunta.associate = models => {
        Pergunta.belongsTo(models.Trilha, { foreignKey: 'trilhaId' });
        Pergunta.hasMany(models.Resposta, { foreignKey: 'perguntaId' });
        Pergunta.hasMany(models.HistoricoResposta, { foreignKey: 'perguntaId' });
    };

    return Pergunta;
};